/**
 * Date utility functions
 */

/**
 * Formats a date according to the specified format
 * @param date The date to format
 * @param format The format string
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: string): string {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")

  return format
    .replace("YYYY", year.toString())
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
}

/**
 * Adds time to a date
 * @param date The base date
 * @param amount The amount to add
 * @param unit The unit of time
 * @returns New date with added time
 */
export function addTime(
  date: Date,
  amount: number,
  unit: "years" | "months" | "days" | "hours" | "minutes" | "seconds",
): Date {
  const result = new Date(date)

  switch (unit) {
    case "years":
      result.setFullYear(result.getFullYear() + amount)
      break
    case "months":
      result.setMonth(result.getMonth() + amount)
      break
    case "days":
      result.setDate(result.getDate() + amount)
      break
    case "hours":
      result.setHours(result.getHours() + amount)
      break
    case "minutes":
      result.setMinutes(result.getMinutes() + amount)
      break
    case "seconds":
      result.setSeconds(result.getSeconds() + amount)
      break
  }

  return result
}

/**
 * Calculates the difference between two dates
 * @param date1 The first date
 * @param date2 The second date
 * @param unit The unit of time
 * @returns Difference in the specified unit
 */
export function dateDiff(
  date1: Date,
  date2: Date,
  unit: "years" | "months" | "days" | "hours" | "minutes" | "seconds",
): number {
  const diffMs = date2.getTime() - date1.getTime()

  switch (unit) {
    case "years":
      return date2.getFullYear() - date1.getFullYear()
    case "months":
      return (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth()
    case "days":
      return Math.floor(diffMs / (1000 * 60 * 60 * 24))
    case "hours":
      return Math.floor(diffMs / (1000 * 60 * 60))
    case "minutes":
      return Math.floor(diffMs / (1000 * 60))
    case "seconds":
      return Math.floor(diffMs / 1000)
    default:
      return diffMs
  }
}

/**
 * Checks if a date is between two other dates
 * @param date The date to check
 * @param startDate The start date
 * @param endDate The end date
 * @param inclusive Whether to include the start and end dates
 * @returns Whether the date is between the start and end dates
 */
export function isBetween(date: Date, startDate: Date, endDate: Date, inclusive = true): boolean {
  const dateTime = date.getTime()

  if (inclusive) {
    return dateTime >= startDate.getTime() && dateTime <= endDate.getTime()
  }

  return dateTime > startDate.getTime() && dateTime < endDate.getTime()
}

/**
 * Returns the start of a time unit for a date
 * @param date The date
 * @param unit The unit of time
 * @returns Date at the start of the specified unit
 */
export function startOf(date: Date, unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second"): Date {
  const result = new Date(date)

  switch (unit) {
    case "year":
      result.setMonth(0, 1)
      result.setHours(0, 0, 0, 0)
      break
    case "month":
      result.setDate(1)
      result.setHours(0, 0, 0, 0)
      break
    case "week":
      const day = result.getDay()
      result.setDate(result.getDate() - day)
      result.setHours(0, 0, 0, 0)
      break
    case "day":
      result.setHours(0, 0, 0, 0)
      break
    case "hour":
      result.setMinutes(0, 0, 0)
      break
    case "minute":
      result.setSeconds(0, 0)
      break
    case "second":
      result.setMilliseconds(0)
      break
  }

  return result
}

/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns Whether the date is valid
 */
export function isValid(date: Date): boolean {
  return !isNaN(date.getTime())
}

/**
 * Formats a date to ISO string (YYYY-MM-DD)
 * @param date The date to format
 * @returns ISO date string
 */
export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0]
}

/**
 * Gets relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date The date to get relative time for
 * @param baseDate The base date (defaults to now)
 * @returns Relative time string
 */
export function fromNow(date: Date, baseDate = new Date()): string {
  const diffMs = date.getTime() - baseDate.getTime()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)
  const diffMonth = Math.round(diffDay / 30)
  const diffYear = Math.round(diffMonth / 12)

  const isFuture = diffMs > 0
  const suffix = isFuture ? "from now" : "ago"

  const absDiffYear = Math.abs(diffYear)
  const absDiffMonth = Math.abs(diffMonth)
  const absDiffDay = Math.abs(diffDay)
  const absDiffHour = Math.abs(diffHour)
  const absDiffMin = Math.abs(diffMin)
  const absDiffSec = Math.abs(diffSec)

  if (absDiffYear >= 1) return `${absDiffYear} ${absDiffYear === 1 ? "year" : "years"} ${suffix}`
  if (absDiffMonth >= 1) return `${absDiffMonth} ${absDiffMonth === 1 ? "month" : "months"} ${suffix}`
  if (absDiffDay >= 1) return `${absDiffDay} ${absDiffDay === 1 ? "day" : "days"} ${suffix}`
  if (absDiffHour >= 1) return `${absDiffHour} ${absDiffHour === 1 ? "hour" : "hours"} ${suffix}`
  if (absDiffMin >= 1) return `${absDiffMin} ${absDiffMin === 1 ? "minute" : "minutes"} ${suffix}`
  return `${absDiffSec} ${absDiffSec === 1 ? "second" : "seconds"} ${suffix}`
}

/**
 * Gets the name of the month
 * @param date The date to get the month name for
 * @returns The name of the month
 */
export function getMonthName(date: Date, short = false): string {
  const months = [
    ["January", "Jan"],
    ["February", "Feb"],
    ["March", "Mar"],
    ["April", "Apr"],
    ["May", "May"],
    ["June", "Jun"],
    ["July", "Jul"],
    ["August", "Aug"],
    ["September", "Sep"],
    ["October", "Oct"],
    ["November", "Nov"],
    ["December", "Dec"],
  ]

  return months[date.getMonth()][short ? 1 : 0]
}
