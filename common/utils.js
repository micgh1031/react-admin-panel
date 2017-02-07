'use strict'
export function compareString (aString, bString) {
  const a = aString.toUpperCase()
  const b = bString.toUpperCase()
  return (a < b) ? -1 : (a > b) ? 1 : 0
}
