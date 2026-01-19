import { setSiteNameFormat } from "../core/router/updater.js";
import { loadPalette } from "../core/themer.js";
import { setTitleNameFormat } from "./titleUpdater.js";

export function initCharacter() {
  setSiteNameFormat("Nekitori17 - %siteName");
  setTitleNameFormat("Nekitori17 - %titleName");
  loadPalette("nekitori17");
}
