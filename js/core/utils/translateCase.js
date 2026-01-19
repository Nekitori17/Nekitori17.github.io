/**
 * @param {string} input
 * @returns {string[]}
 */
function splitWords(input) {
  if (!input || typeof input !== "string") return [];

  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase());
}

/**
 * @param {string} input
 */
export function toCamelCase(input) {
  const words = splitWords(input);
  if (words.length === 0) return "";

  return (
    words[0] +
    words
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("")
  );
}

/**
 * @param {string} input
 */
export function toPascalCase(input) {
  return splitWords(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/**
 * @param {string} input
 */
export function toSnakeCase(input) {
  return splitWords(input).join("_");
}

/**
 * @param {string} input
 */
export function toKebabCase(input) {
  return splitWords(input).join("-");
}

/**
 * @param {string} input
 */
export function toConstantCase(input) {
  return splitWords(input).join("_").toUpperCase();
}

/**
 * @param {string} input
 */
export function toSpaceCase(input) {
  return splitWords(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
