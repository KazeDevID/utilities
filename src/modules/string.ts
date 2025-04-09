/**
 * String utility functions
 */

/**
 * Truncates a string to a specified length
 * @param str The string to truncate
 * @param length Maximum length
 * @param suffix Suffix to add to truncated string
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix = "..."): string {
  if (str.length <= length) return str
  return str.substring(0, length - suffix.length) + suffix
}

/**
 * Converts a string to camelCase
 * @param str The string to convert
 * @returns camelCase string
 */
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, "")
    .replace(/[-_]+/g, "")
}

/**
 * Converts a string to kebab-case
 * @param str The string to convert
 * @returns kebab-case string
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .toLowerCase()
}

/**
 * Converts a string to snake_case
 * @param str The string to convert
 * @returns snake_case string
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .toLowerCase()
}

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== "string") return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Checks if a string contains another string
 * @param str The string to check
 * @param search The string to search for
 * @param caseSensitive Whether the search is case sensitive
 * @returns Whether the string contains the search string
 */
export function contains(str: string, search: string, caseSensitive = true): boolean {
  if (!caseSensitive) {
    return str.toLowerCase().includes(search.toLowerCase())
  }
  return str.includes(search)
}

/**
 * Generates a random string
 * @param length The length of the string
 * @param chars The characters to use
 * @returns Random string
 */
export function randomString(
  length: number,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
): string {
  let result = ""
  const charsLength = chars.length

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength))
  }

  return result
}

/**
 * Escapes HTML special characters in a string
 * @param str The string to escape
 * @returns Escaped string
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Creates a URL-friendly slug from a string
 * @param str The string to slugify
 * @returns Slugified string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Counts the number of words in a string
 * @param str The string to count
 * @returns Number of words
 */
export function wordCount(str: string): number {
  return str.trim().split(/\s+/).length
}

/**
 * Checks if a string is a palindrome
 * @param str The string to check
 * @returns Whether the string is a palindrome
 */
export function isPalindrome(str: string): boolean {
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "")
  const reversed = normalizedStr.split("").reverse().join("")
  return normalizedStr === reversed
}

/**
 * Simple template string function
 * @param template The template string with {{placeholders}}
 * @param data The data object with values for placeholders
 * @returns Rendered string
 */
export function template(template: string, data: Record<string, any>): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    return data[key.trim()] !== undefined ? String(data[key.trim()]) : ""
  })
}

/**
 * Reverses a string
 * @param str The string to reverse
 * @returns Reversed string
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("")
}

/**
 * Pad a string to a certain length with specified characters
 * @param str The string to pad
 * @param length The target length
 * @param chars The character(s) to pad with
 * @returns Padded string
 */
export function pad(str: string, length: number, chars = " "): string {
  const padLength = Math.max(0, length - str.length)
  const padStart = Math.floor(padLength / 2)
  const padEnd = padLength - padStart

  return chars.repeat(padStart) + str + chars.repeat(padEnd)
}
