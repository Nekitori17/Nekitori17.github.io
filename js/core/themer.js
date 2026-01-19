/**
 * @param {String} paletteName
 */
export function loadPalette(paletteName) {
  document
    .querySelector("link#color-palette")
    ?.setAttribute("href", `/css/palettes/${paletteName}.css`);
}
