import constants from "../../constants.js";
import { loadPage } from "./loadPage.js";
import { updateSiteName } from "./updater.js";
import { getCurrentPageSession } from "./session.js";

/**
 * @param {HTMLElement | null} container
 */
export function initRouter(container) {
  if (!container) throw new Error("Container not found");

  const navigate = async () => {
    const page = getCurrentPageSession();
    updateSiteName(page);
    await loadPage(page, container);
  };

  window.addEventListener("hashchange", navigate);

  if (!window.location.hash) {
    window.location.hash = constants.DEFAULT_PAGE;
  } else {
    navigate();
  }
}

/**
 * @param {String} pageName
 * @param {(pageName: string) => void | null} callBack
 */
export function navigateTo(pageName, callBack) {
  window.location.hash = pageName;
  if (callBack) callBack(pageName);
}
