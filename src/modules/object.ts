/**
 * Object utility functions
 */

/**
 * Picks specified properties from an object
 * @param obj The source object
 * @param keys Array of keys to pick
 * @returns New object with only the specified keys
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>,
  )
}

/**
 * Omits specified properties from an object
 * @param obj The source object
 * @param keys Array of keys to omit
 * @returns New object without the specified keys
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => {
    delete result[key]
  })
  return result as Omit<T, K>
}

/**
 * Deeply merges two objects
 * @param target The target object
 * @param source The source object
 * @returns Merged object
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target }

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key as keyof typeof source])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof typeof source] })
        } else {
          output[key as keyof T] = deepMerge(
            target[key as keyof T] as object,
            source[key as keyof typeof source] as object,
          ) as T[keyof T]
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof typeof source] })
      }
    })
  }

  return output
}

/**
 * Checks if a value is an object
 * @param item The value to check
 * @returns Whether the value is an object
 */
export function isObject(item: unknown): item is object {
  return Boolean(item && typeof item === "object" && !Array.isArray(item))
}

/**
 * Creates a deep clone of an object
 * @param obj The object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }

  return Object.keys(obj).reduce((result, key) => {
    result[key as keyof T] = deepClone(obj[key as keyof T])
    return result
  }, {} as T)
}

/**
 * Flattens a nested object structure
 * @param obj The object to flatten
 * @param prefix Prefix for nested keys
 * @returns Flattened object with dot notation keys
 */
export function flattenObject(obj: Record<string, any>, prefix = ""): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, k) => {
      const pre = prefix.length ? `${prefix}.` : ""
      if (isObject(obj[k]) && Object.keys(obj[k]).length > 0) {
        Object.assign(acc, flattenObject(obj[k], `${pre}${k}`))
      } else {
        acc[`${pre}${k}`] = obj[k]
      }
      return acc
    },
    {} as Record<string, any>,
  )
}

/**
 * Checks if an object is empty
 * @param obj The object to check
 * @returns Whether the object is empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Maps values in an object
 * @param obj The object to map
 * @param fn The mapping function
 * @returns New object with mapped values
 */
export function mapValues<T, R>(obj: Record<string, T>, fn: (value: T, key: string) => R): Record<string, R> {
  return Object.keys(obj).reduce(
    (result, key) => {
      result[key] = fn(obj[key], key)
      return result
    },
    {} as Record<string, R>,
  )
}

/**
 * Converts an object to [key, value] pairs
 * @param obj The object to convert
 * @returns Array of [key, value] pairs
 */
export function toPairs<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj)
}

/**
 * Converts an array of [key, value] pairs to an object
 * @param pairs Array of [key, value] pairs
 * @returns Object created from pairs
 */
export function fromPairs<T>(pairs: [string, T][]): Record<string, T> {
  return pairs.reduce(
    (result, [key, value]) => {
      result[key] = value
      return result
    },
    {} as Record<string, T>,
  )
}

/**
 * Performs a deep equality check between two objects
 * @param objA First object
 * @param objB Second object
 * @returns Whether the objects are deeply equal
 */
export function isEqual(objA: any, objB: any): boolean {
  if (objA === objB) return true

  if (typeof objA !== "object" || typeof objB !== "object" || objA === null || objB === null) {
    return objA === objB
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  return keysA.every((key) => keysB.includes(key) && isEqual(objA[key], objB[key]))
}
