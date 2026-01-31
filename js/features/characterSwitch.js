import config from "./config.js";
import { setSiteNameFormat } from "../core/router/updater.js";
import { loadPalette } from "../core/themer.js";
import { initTitleUpdater, setTitleNameFormat } from "./titleUpdater.js";
import { toSpaceCase } from "../core/utils/translateCase.js";

/**
 * @typedef {keyof typeof config.CHARACTERS} Character
 */

const CHARACTER_STORAGE_KEY = "character";

/**
 * @param {HTMLElement | null} titleElement
 * @param {HTMLElement | null} navBarElement
 */
export function initCharacter(titleElement, navBarElement) {
  EventBus.on(
    "characterChanged",
    /** @param {unknown} character */
    (character) => {
      if (!isValidCharacter(character)) return;

      persistCharacter(character);
      applyCharacter(character, navBarElement);
    },
  );

  if (titleElement) initTitleUpdater(titleElement);
  else console.warn("Title element not found, title updater skipped.");

  const character = getInitialCharacter();
  return applyCharacter(character, navBarElement);
}

/**
 * @returns {Character}
 */
function getInitialCharacter() {
  const fromSession = window.sessionStorage.getItem(CHARACTER_STORAGE_KEY);

  if (isValidCharacter(fromSession)) {
    return fromSession;
  }

  if (isValidCharacter(config.DEFAULT_CHARACTER)) {
    return config.DEFAULT_CHARACTER;
  }

  return getFallbackCharacter();
}

/**
 * @param {Character} character
 * @param {HTMLElement | null} navBarElement
 */
function applyCharacter(character, navBarElement) {
  const displayName = toSpaceCase(character);

  setSiteNameFormat(`${displayName} - %siteName`);
  setTitleNameFormat(`${displayName} - %titleName`);
  hideElementByCharacter(character, navBarElement);
  return loadPalette(character);
}

/**
 * @param {Character} character
 * @param {HTMLElement | null} navBarElement
 */
function hideElementByCharacter(character, navBarElement) {
  if (!navBarElement) {
    console.warn("navBarElement not found, skip hideElementByCharacter.");
    return;
  }

  const { hideNavLinks = [] } = config.CHARACTERS[character] ?? {};
  const navLinks = navBarElement.querySelectorAll(".navigation a");

  navLinks.forEach((link) => {
    if (!(link instanceof HTMLElement)) return;

    const key = link.id;
    link.classList.toggle("hidden", hideNavLinks.includes(key));
  });
}

/**
 * @param {Character} character
 */
function persistCharacter(character) {
  window.sessionStorage.setItem(CHARACTER_STORAGE_KEY, character);
}

/**
 * @param {unknown} character
 * @returns {character is Character}
 */
function isValidCharacter(character) {
  return typeof character === "string" && character in config.CHARACTERS;
}

/**
 * @returns {Character}
 */
function getFallbackCharacter() {
  return /** @type {Character} */ (Object.keys(config.CHARACTERS)[0]);
}

export function getCurrentCharacter() {
  return getInitialCharacter();
}
