/**
 * Storage utility functions
 */

/**
 * Gets an item from localStorage with JSON parsing
 * @param key The key to get
 * @param defaultValue Default value if key doesn't exist or parsing fails
 * @returns The parsed value or defaultValue
 */
export function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue
    return JSON.parse(item) as T
  } catch (error) {
    return defaultValue
  }
}

/**
 * Sets an item in localStorage with JSON stringification
 * @param key The key to set
 * @param value The value to set
 */
export function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error setting localStorage item:", error)
  }
}

/**
 * Removes an item from localStorage
 * @param key The key to remove
 */
export function removeLocalItem(key: string): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return
  }

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing localStorage item:", error)
  }
}

/**
 * Gets an item from sessionStorage with JSON parsing
 * @param key The key to get
 * @param defaultValue Default value if key doesn't exist or parsing fails
 * @returns The parsed value or defaultValue
 */
export function getSessionItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return defaultValue
  }

  try {
    const item = sessionStorage.getItem(key)
    if (item === null) return defaultValue
    return JSON.parse(item) as T
  } catch (error) {
    return defaultValue
  }
}

/**
 * Sets an item in sessionStorage with JSON stringification
 * @param key The key to set
 * @param value The value to set
 */
export function setSessionItem<T>(key: string, value: T): void {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return
  }

  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error setting sessionStorage item:", error)
  }
}

/**
 * Removes an item from sessionStorage
 * @param key The key to remove
 */
export function removeSessionItem(key: string): void {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return
  }

  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing sessionStorage item:", error)
  }
}

/**
 * Clears all items from localStorage
 */
export function clearLocalStorage(): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return
  }

  try {
    localStorage.clear()
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}

/**
 * Clears all items from sessionStorage
 */
export function clearSessionStorage(): void {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return
  }

  try {
    sessionStorage.clear()
  } catch (error) {
    console.error("Error clearing sessionStorage:", error)
  }
}

/**
 * Creates a namespaced storage object
 * @param namespace The namespace for the storage
 * @returns Object with get, set, and remove methods
 */
export function createNamespacedStorage(namespace: string) {
  return {
    get<T>(key: string, defaultValue: T): T {
      return getLocalItem<T>(`${namespace}:${key}`, defaultValue)
    },
    set<T>(key: string, value: T): void {
      setLocalItem<T>(`${namespace}:${key}`, value)
    },
    remove(key: string): void {
      removeLocalItem(`${namespace}:${key}`)
    },
    clear(): void {
      if (typeof window === "undefined" || typeof localStorage === "undefined") {
        return
      }

      // Only clear items in this namespace
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(`${namespace}:`)) {
          removeLocalItem(key)
        }
      })
    },
  }
}
