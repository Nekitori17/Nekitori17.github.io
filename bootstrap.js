import "./js/features/bootLoading.js";

import "./js/core/managers/index.js";

import { initRouter } from "./js/core/router/index.js";
import initNavigationBar from "./js/features/navigationBar.js";
import { initCharacter } from "./js/features/characterSwitch.js";

import { removeBootLoading } from "./js/features/bootLoading.js";

initNavigationBar();
initCharacter(
  document.querySelector(".header .title h1"),
  document.querySelector(".header nav.navigation"),
);

window.addEventListener("DOMContentLoaded", () => {
  try {
    /** @type {HTMLElement | null} */
    const container = document.querySelector("main.container");
    initRouter(container);

    removeBootLoading();
  } catch (error) {
    console.error(error);
    removeBootLoading();
  }
});
