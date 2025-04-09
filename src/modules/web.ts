/**
 * Web utility functions
 */

/**
 * Parses URL query parameters
 * @param url The URL to parse
 * @returns Object with query parameters
 */
export function parseQueryParams(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url)
    const params: Record<string, string> = {}

    urlObj.searchParams.forEach((value, key) => {
      params[key] = value
    })

    return params
  } catch (error) {
    // If URL is invalid, try to parse just the query string
    const queryString = url.includes("?") ? url.split("?")[1] : url

    if (!queryString) return {}

    return queryString.split("&").reduce((params: Record<string, string>, param) => {
      const [key, value] = param.split("=")
      if (key) params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : ""
      return params
    }, {})
  }
}

/**
 * Builds a URL with query parameters
 * @param baseUrl The base URL
 * @param params The query parameters
 * @returns URL with query parameters
 */
export function buildUrl(baseUrl: string, params: Record<string, string | number | boolean>): string {
  const url = new URL(baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })

  return url.toString()
}

/**
 * Safely parses JSON with error handling
 * @param json The JSON string to parse
 * @param fallback Fallback value if parsing fails
 * @returns Parsed JSON or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch (error) {
    return fallback
  }
}

/**
 * Gets a cookie value by name
 * @param name The cookie name
 * @returns Cookie value or empty string
 */
export function getCookie(name: string): string {
  if (typeof document === "undefined") return ""

  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`))
  return match ? decodeURIComponent(match[3]) : ""
}

/**
 * Sets a cookie
 * @param name The cookie name
 * @param value The cookie value
 * @param options Cookie options
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: "strict" | "lax" | "none"
  } = {},
): void {
  if (typeof document === "undefined") return

  const { days = 7, path = "/", domain, secure, sameSite = "lax" } = options

  const expires = days ? new Date(Date.now() + days * 864e5).toUTCString() : ""

  document.cookie = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    expires ? `; expires=${expires}` : "",
    path ? `; path=${path}` : "",
    domain ? `; domain=${domain}` : "",
    secure ? "; secure" : "",
    `; samesite=${sameSite}`,
  ].join("")
}

/**
 * Deletes a cookie
 * @param name The cookie name
 * @param options Cookie options
 */
export function deleteCookie(name: string, options: { path?: string; domain?: string } = {}): void {
  setCookie(name, "", { ...options, days: -1 })
}

/**
 * Detects if the code is running in a browser environment
 * @returns Whether the code is running in a browser
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

/**
 * Detects if the device is mobile
 * @returns Whether the device is mobile
 */
export function isMobile(): boolean {
  if (!isBrowser()) return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait = 300): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>): void {
    

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds
 * @param func The function to throttle
 * @param limit The number of milliseconds to throttle invocations to
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit = 300): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout>
  let lastRan: number

  return function (this: any, ...args: Parameters<T>): void {
    

    if (!lastRan) {
      func.apply(this, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}

/**
 * Copies text to clipboard
 * @param text The text to copy
 * @returns Promise that resolves when the text is copied
 */
export function copyToClipboard(text: string): Promise<void> {
  if (!isBrowser()) {
    return Promise.reject(new Error("copyToClipboard can only be used in a browser environment"))
  }

  // Use the newer Clipboard API if available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }

  // Fallback to the older execCommand method
  return new Promise((resolve, reject) => {
    try {
      const el = document.createElement("textarea")
      el.value = text
      el.setAttribute("readonly", "")
      el.style.position = "absolute"
      el.style.left = "-9999px"
      document.body.appendChild(el)

      const selected = (document.getSelection()?.rangeCount ?? 0 > 0) ? document.getSelection()?.getRangeAt(0) : null

      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)

      if (selected && document.getSelection()) {
        document.getSelection()?.removeAllRanges()
        document.getSelection()?.addRange(selected)
      }

      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Fetch with timeout support
 * @param resource The resource to fetch
 * @param options Fetch options
 * @param timeoutMs Timeout in milliseconds
 * @returns Promise that resolves with the fetch response
 */
export function fetchWithTimeout(resource: RequestInfo, options?: RequestInit, timeoutMs = 10000): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
      reject(new Error(`Request timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    fetch(resource, {
      ...options,
      signal: controller.signal,
    })
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeout))
  })
}
