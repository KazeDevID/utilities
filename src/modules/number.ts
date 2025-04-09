/**
 * Number utility functions
 */

/**
 * Clamps a number between min and max values
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * Formats a number with thousand separators
 * @param num The number to format
 * @param separator The thousand separator (default: ',')
 * @returns Formatted number string
 */
export function formatThousands(num: number, separator = ","): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/**
 * Formats a number as currency
 * @param num The number to format
 * @param currency The currency symbol (default: '$')
 * @param decimals The number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(num: number, currency = "$", decimals = 2): string {
  return currency + num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * Formats a number as percentage
 * @param num The number to format (0-1)
 * @param decimals The number of decimal places (default: 0)
 * @returns Formatted percentage string
 */
export function formatPercent(num: number, decimals = 0): string {
  return (num * 100).toFixed(decimals) + "%"
}

/**
 * Rounds a number to a specified number of decimal places
 * @param num The number to round
 * @param decimals The number of decimal places (default: 0)
 * @returns Rounded number
 */
export function round(num: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

/**
 * Checks if a number is even
 * @param num The number to check
 * @returns Whether the number is even
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}

/**
 * Checks if a number is odd
 * @param num The number to check
 * @returns Whether the number is odd
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0
}

/**
 * Generates a random number between min and max
 * @param min The minimum value (inclusive)
 * @param max The maximum value (exclusive)
 * @returns Random number
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Generates a random integer between min and max
 * @param min The minimum value (inclusive)
 * @param max The maximum value (inclusive)
 * @returns Random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Calculates the sum of an array of numbers
 * @param numbers The array of numbers
 * @returns The sum
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0)
}

/**
 * Calculates the average of an array of numbers
 * @param numbers The array of numbers
 * @returns The average
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return sum(numbers) / numbers.length
}

/**
 * Converts a number from one range to another
 * @param num The number to convert
 * @param inMin The input range minimum
 * @param inMax The input range maximum
 * @param outMin The output range minimum
 * @param outMax The output range maximum
 * @returns The mapped number
 */
export function map(num: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
