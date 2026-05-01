import { waitForStylesheet } from "./utils/waitForStylesheet.js";

/**
 * @param {string} paletteName
 * @returns {Promise<void>}
 */
export async function loadPalette(paletteName) {
  const link = document.querySelector("#color-palette");

  if (link instanceof HTMLLinkElement) {
    const href = `/css/palettes/${paletteName}.css`;

    if (!(link.href.includes(href) && link.sheet)) {
      link.href = href;
      await waitForStylesheet(link);
    }
  }

  document.querySelector("body > main")?.classList.add("palette-ready");
}
