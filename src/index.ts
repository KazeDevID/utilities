// Export all modules
export { isBetween } from './modules/date'
export { isEmpty as objectIsEmpty } from './modules/object'
export { isObject as objectIsObject } from './modules/object'

export * from "./modules/logger"
export * from "./modules/array"
export * from "./modules/object"
export * from "./modules/date"
export * from "./modules/string"
export * from "./modules/web"
export * from "./modules/number"
export * from "./modules/validation"
export * from "./modules/storage"

// Named exports for specific modules
import * as array from "./modules/array"
import * as object from "./modules/object"
import * as string from "./modules/string"
import * as date from "./modules/date"
import * as web from "./modules/web"
import * as logger from "./modules/logger"
import * as number from "./modules/number"
import * as validation from "./modules/validation"
import * as storage from "./modules/storage"

// Export modules as namespaces
export { array, object, string, date, web, logger, number, validation, storage }
