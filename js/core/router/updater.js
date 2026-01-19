import { toSpaceCase } from "./../utils/translateCase.js"

let format = "%siteName";

/**
 * @param {string} pageName
 * @param {(siteName: string) => void} [callback]
 */
export function updateSiteName(pageName, callback) {
  const siteName = toSpaceCase(pageName);
  
  const fullSiteName = format.replaceAll("%siteName", siteName)
  document.title = fullSiteName;

  if (typeof callback === "function") callback(fullSiteName);
}

/**
 * @param {string} newFormat
 */
export function setSiteNameFormat(newFormat) {
  if (typeof newFormat !== "string" || !newFormat.includes("%siteName"))
    console.warn('Site name format should contain "%siteName"');

  format = newFormat;

  const currentPage = window.location.hash.slice(1);
  updateSiteName(currentPage);
}

export function getSiteNameFormat() {
  return format;
}
