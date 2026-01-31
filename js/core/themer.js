/**
 * @param {string} paletteName
 * @returns {Promise<void>}
 */
export function loadPalette(paletteName) {
  return new Promise((resolve) => {
    const link = document.querySelector("#color-palette");
    if (!(link instanceof HTMLLinkElement)) {
      document.body.classList.add("palette-ready");
      resolve();
      return;
    }

    const href = `/css/palettes/${paletteName}.css`;

    if (link.href.includes(href) && link.sheet) {
      document.body.classList.add("palette-ready");
      resolve();
      return;
    }

    link.addEventListener(
      "load",
      () => {
        document.body.classList.add("palette-ready");
        resolve();
      },
      { once: true },
    );

    link.addEventListener(
      "error",
      () => {
        document.body.classList.add("palette-ready");
        resolve();
      },
      { once: true },
    );

    link.href = href;
  });
}
