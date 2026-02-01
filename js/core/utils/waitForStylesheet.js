/**
 * @param {HTMLLinkElement} link
 * @returns {Promise<void>}
 */
export function waitForStylesheet(link) {
  if (link.sheet) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => resolve(), { once: true });
  });
}

/**
 * @param {HTMLElement} page
 */
export async function waitForAllStyleSheet(page) {
  /** @type {NodeListOf<HTMLLinkElement>} */
  const allStyleSheet = page.querySelectorAll("link[rel=stylesheet]");

  const loadWaitPromise = Array.from(allStyleSheet).map((style) =>
    waitForStylesheet(style),
  );

  await Promise.all(loadWaitPromise);
}