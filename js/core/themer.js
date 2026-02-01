/**
 * @param {string} paletteName
 * @returns {Promise<void>}
 */
export async function loadPalette(paletteName) {
  const link = document.querySelector("#color-palette");

  if (link instanceof HTMLLinkElement) {
    await waitForStylesheet(link, `/css/palettes/${paletteName}.css`);
  }

  document.querySelector("body > main")?.classList.add("palette-ready");
}

/**
 * @param {HTMLLinkElement} link
 * @param {string} href
 * @returns {Promise<void>}
 */
function waitForStylesheet(link, href) {
  if (link.href.includes(href) && link.sheet) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => resolve(), { once: true });
    link.href = href;
  });
}
