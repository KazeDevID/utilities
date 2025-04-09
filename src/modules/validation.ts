/**
 * Validation utility functions
 */

/**
 * Checks if a value is null or undefined
 * @param value The value to check
 * @returns Whether the value is null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value The value to check
 * @returns Whether the value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (isNullOrUndefined(value)) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === "object") return Object.keys(value as object).length === 0
  return false
}

/**
 * Checks if a value is a number
 * @param value The value to check
 * @returns Whether the value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value)
}

/**
 * Checks if a value is a string
 * @param value The value to check
 * @returns Whether the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string"
}

/**
 * Checks if a value is a boolean
 * @param value The value to check
 * @returns Whether the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean"
}

/**
 * Checks if a value is an array
 * @param value The value to check
 * @returns Whether the value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * Checks if a value is an object
 * @param value The value to check
 * @returns Whether the value is an object
 */
export function isObject(value: unknown): value is object {
  return Boolean(value && typeof value === "object" && !Array.isArray(value))
}

/**
 * Checks if a value is a function
 * @param value The value to check
 * @returns Whether the value is a function
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function"
}

/**
 * Checks if a string is a valid email address
 * @param value The string to check
 * @returns Whether the string is a valid email
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * Checks if a string is a valid URL
 * @param value The string to check
 * @returns Whether the string is a valid URL
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * Checks if a date is valid
 * @param value The date to check
 * @returns Whether the date is valid
 */
export function isValidDate(value: Date | string | number): boolean {
  if (value instanceof Date) return !isNaN(value.getTime())
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value)
    return !isNaN(date.getTime())
  }
  return false
}

/**
 * Checks if a string matches a regex pattern
 * @param value The string to check
 * @param pattern The regex pattern
 * @returns Whether the string matches the pattern
 */
export function matches(value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

/**
 * Validates that a value is between min and max (inclusive)
 * @param value The value to check
 * @param min The minimum value
 * @param max The maximum value
 * @returns Whether the value is between min and max
 */
export function isBetween(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validates that a string's length is between min and max (inclusive)
 * @param value The string to check
 * @param min The minimum length
 * @param max The maximum length
 * @returns Whether the string's length is between min and max
 */
export function hasLengthBetween(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max
}
