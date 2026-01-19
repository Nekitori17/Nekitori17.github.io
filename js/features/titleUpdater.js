import { getCurrentPageSession } from "./../core/router/session.js";
import { toSpaceCase } from "./../core/utils/translateCase.js";

/** @type {HTMLElement | null} */
let slotElement = null;
let format = "%titleName";

/**
 * @param {HTMLElement | null} slot
 * @param {(siteName: string) => void} [callback]
 */
export function initTitleUpdater(slot, callback) {
  if (!slot)
    throw new Error("Slot element must be provided to initTitleUpdater");

  slotElement = slot;

  const navigate = async () => {
    updateTitleName(getCurrentPageSession(), callback);
  };

  window.addEventListener("hashchange", navigate);
}

/**
 * @param {string} titleName
 * @param {(siteName: string) => void} [callback]
 */
export function updateTitleName(titleName, callback) {
  if (!slotElement) return;

  const siteName = toSpaceCase(titleName);

  const fullSiteName = format.replaceAll("%titleName", siteName);
  slotElement.innerHTML = fullSiteName;

  if (typeof callback === "function") callback(fullSiteName);
}

/**
 * @param {string} newFormat
 */
export function setTitleNameFormat(newFormat) {
  if (typeof newFormat !== "string" || !newFormat.includes("%titleName"))
    console.warn('Title name format should contain "%titleName"');

  format = newFormat;

  const currentPage = window.location.hash.slice(1);
  updateTitleName(currentPage);
}

export function getTitleNameFormat() {
  return format;
}
