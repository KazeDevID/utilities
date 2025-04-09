/**
 * Array utility functions
 */

/**
 * Chunks an array into smaller arrays of specified size
 * @param array The array to chunk
 * @param size The size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length || size < 1) return []

  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

/**
 * Returns a new array with unique values
 * @param array The array to process
 * @returns Array with unique values
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Returns the difference between two arrays
 * @param array The base array
 * @param values The values to exclude
 * @returns Array with values from array that are not in values
 */
export function difference<T>(array: T[], values: T[]): T[] {
  return array.filter((item) => !values.includes(item))
}

/**
 * Groups array items by a key returned by the iteratee function
 * @param array The array to group
 * @param iteratee Function that returns the key to group by
 * @returns Object with keys as group names and values as arrays
 */
export function groupBy<T>(array: T[], iteratee: (item: T) => string | number): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, item) => {
    const key = String(iteratee(item))
    if (!result[key]) {
      result[key] = []
    }
    result[key].push(item)
    return result
  }, {})
}

/**
 * Returns the intersection of two arrays
 * @param array The first array
 * @param values The second array
 * @returns Array with values common to both arrays
 */
export function intersection<T>(array: T[], values: T[]): T[] {
  return array.filter((item) => values.includes(item))
}

/**
 * Flattens an array a single level deep
 * @param array The array to flatten
 * @returns Flattened array
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce((result: T[], item) => {
    if (Array.isArray(item)) {
      result.push(...item)
    } else {
      result.push(item)
    }
    return result
  }, [])
}

/**
 * Gets the first element of array
 * @param array The array to query
 * @returns The first element of array
 */
export function first<T>(array: T[]): T | undefined {
  return array[0]
}

/**
 * Gets the last element of array
 * @param array The array to query
 * @returns The last element of array
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection through iteratee.
 * @param array The array to iterate over
 * @param iteratee The iteratee to transform keys
 * @returns The composed aggregate object
 */
export function keyBy<T>(array: T[], iteratee: (item: T) => string | number): Record<string, T> {
  return array.reduce((result: Record<string, T>, item) => {
    const key = String(iteratee(item))
    result[key] = item
    return result
  }, {})
}

/**
 * Sorts an array of objects by a property
 * @param array The array to sort
 * @param key The property to sort by
 * @param order The sort order ('asc' or 'desc')
 * @returns The sorted array
 */
export function sortBy<T>(
  array: T[],
  key: keyof T | ((item: T) => number | string),
  order: "asc" | "desc" = "asc",
): T[] {
  const getVal = typeof key === "function" ? key : (item: T) => item[key]

  return [...array].sort((a, b) => {
    const valueA = getVal(a)
    const valueB = getVal(b)

    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    if (valueA < valueB) return order === "asc" ? -1 : 1
    if (valueA > valueB) return order === "asc" ? 1 : -1
    return 0
  })
}

/**
 * Counts occurrences of each value in an array
 * @param array The array to count
 * @returns Object with counts
 */
export function count<T>(array: T[]): Record<string, number> {
  return array.reduce((result: Record<string, number>, item) => {
    const key = String(item)
    result[key] = (result[key] || 0) + 1
    return result
  }, {})
}

/**
 * Partitions elements into two groups according to a predicate
 * @param array The array to partition
 * @param predicate The function to determine which group an element belongs to
 * @returns An array of two arrays where the first contains elements that satisfy the predicate
 */
export function partition<T>(array: T[], predicate: (value: T) => boolean): [T[], T[]] {
  return array.reduce<[T[], T[]]>(
    (acc, val) => {
      acc[predicate(val) ? 0 : 1].push(val)
      return acc
    },
    [[], []],
  )
}

/**
 * Samples a single random element from an array
 * @param array The array to sample from
 * @returns A random element
 */
export function sample<T>(array: T[]): T | undefined {
  if (!array.length) return undefined
  return array[Math.floor(Math.random() * array.length)]
}
