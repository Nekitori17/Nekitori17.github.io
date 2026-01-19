import constants from "../../constants.js";

export function getCurrentPageSession() {
  return (
    window.location.hash.slice(1) ||
    window.sessionStorage.getItem("pageSession") ||
    constants.DEFAULT_PAGE
  );
}

/**
 * @param {string} pageName
 */
export function setCurrentPageSession(pageName) {
  sessionStorage.setItem("pageSession", pageName);
}
