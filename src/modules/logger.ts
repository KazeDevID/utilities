/**
 * A lightweight alternative to chalk for console logging with colors
 */

type ColorCode =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "brightRed"
  | "brightGreen"
  | "brightYellow"
  | "brightBlue"
  | "brightMagenta"
  | "brightCyan"
  | "brightWhite"

type BackgroundColorCode =
  | "bgBlack"
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite"
  | "bgGray"
  | "bgBrightRed"
  | "bgBrightGreen"
  | "bgBrightYellow"
  | "bgBrightBlue"
  | "bgBrightMagenta"
  | "bgBrightCyan"
  | "bgBrightWhite"

type StyleCode = "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough"

const colorCodes: Record<ColorCode, number> = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  gray: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,
}

const bgColorCodes: Record<BackgroundColorCode, number> = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
  bgGray: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107,
}

const styleCodes: Record<StyleCode, number> = {
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  inverse: 7,
  hidden: 8,
  strikethrough: 9,
}

/**
 * Applies ANSI color and style codes to a string
 * @param text The text to style
 * @param color The foreground color
 * @param bgColor The background color
 * @param styles Array of text styles
 * @returns Styled string
 */
export function colorize(text: string, color?: ColorCode, bgColor?: BackgroundColorCode, styles?: StyleCode[]): string {
  if (!text) return ""
  if (!color && !bgColor && (!styles || styles.length === 0)) return text

  const codes: number[] = []

  if (color && colorCodes[color]) {
    codes.push(colorCodes[color])
  }

  if (bgColor && bgColorCodes[bgColor]) {
    codes.push(bgColorCodes[bgColor])
  }

  if (styles && styles.length > 0) {
    styles.forEach((style) => {
      if (styleCodes[style]) {
        codes.push(styleCodes[style])
      }
    })
  }

  if (codes.length === 0) return text

  return `\x1b[${codes.join(";")}m${text}\x1b[0m`
}

/**
 * Logger object with methods for different colored logs
 */
export const log = {
  info: (message: string) => console.log(colorize(message, "blue")),
  success: (message: string) => console.log(colorize(message, "green")),
  warning: (message: string) => console.log(colorize(message, "yellow")),
  error: (message: string) => console.log(colorize(message, "red")),
  debug: (message: string) => console.log(colorize(message, "magenta")),

  // Styled variants
  bold: (message: string, color?: ColorCode) => console.log(colorize(message, color, undefined, ["bold"])),
  underline: (message: string, color?: ColorCode) => console.log(colorize(message, color, undefined, ["underline"])),

  // Custom styling
  custom: (message: string, color?: ColorCode, bgColor?: BackgroundColorCode, styles?: StyleCode[]) =>
    console.log(colorize(message, color, bgColor, styles)),
}
