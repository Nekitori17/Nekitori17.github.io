import config from "./config.js";
import { setSiteNameFormat } from "../core/router/updater.js";
import { loadPalette } from "../core/themer.js";
import { initTitleUpdater, setTitleNameFormat } from "./titleUpdater.js";
import { toSpaceCase } from "../core/utils/translateCase.js";

/**
 * @typedef {"nekitori17" | "plinkatsu"} Character
 */

/**
 * @param {HTMLElement | null} titleELement
 * @param {HTMLElement | null} navBarElement
 */
export function initCharacter(titleELement, navBarElement) {
  /** @type {Character} */
  const currentCharacterSession = (() => {
    /**@type {Character} */
    const DEFAULT_CHARACTER =
      config.DEFAULT_CHARACTER == "nekitori17" ||
      config.DEFAULT_CHARACTER == "plinkatsu"
        ? config.DEFAULT_CHARACTER
        : "nekitori17";

    const characterSession = window.sessionStorage.getItem("character");
    return characterSession == "nekitori17" || characterSession == "plinkatsu"
      ? characterSession
      : DEFAULT_CHARACTER;
  })();

  if (titleELement) initTitleUpdater(titleELement);
  else
    console.warn(
      "Title element not found, title updater will not be initialized.",
    );

  setSiteNameFormat(`${toSpaceCase(currentCharacterSession)} - %siteName`);
  setTitleNameFormat(`${toSpaceCase(currentCharacterSession)} - %titleName`);
  hideElementByCharacter(currentCharacterSession, navBarElement);
  loadPalette(currentCharacterSession);

  window.Manager.EventBus.on(
    "characterChanged",
    /** @param {Character} character */
    (character) => {
      if (character !== "nekitori17" && character !== "plinkatsu") return;

      window.sessionStorage.setItem("character", character);

      setSiteNameFormat(`${toSpaceCase(character)} - %siteName`);
      setTitleNameFormat(`${toSpaceCase(character)} - %titleName`);
      hideElementByCharacter(character, navBarElement);
      loadPalette(character);
    },
  );
}

/**
 * @param {Character} character
 * @param {HTMLElement | null} navBarElement
 */
function hideElementByCharacter(character, navBarElement) {
  if (!navBarElement) return console.warn("navBarElement not found");

  const navLinks = navBarElement.querySelectorAll(".navigation a");

  navLinks.forEach((link) => {
    if (!(link instanceof HTMLElement)) return;
    const linkName = link.id;
    const characterConfig = config.CHARACTERS[character];

    if (characterConfig && characterConfig.hideNavLinks.includes(linkName)) {
      link.style.display = "none";
    } else {
      link.style.display = "block";
    }
  });
}
