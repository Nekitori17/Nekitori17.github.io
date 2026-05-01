/**
 * @param {number} duration
 */
export function removeBootLoading(duration = 260) {
  /** @type {HTMLElement | null} */
  const el = document.querySelector("#boot-loading");
  if (!el) return;

  el.style.transition = `opacity ${duration}ms ease-in-out`;
  el.style.opacity = "0";
  el.style.pointerEvents = "none";

  setTimeout(() => el.remove(), duration);
}
