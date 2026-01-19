import "./js/core/managers/index.js";

import { initRouter } from "./js/core/router/index.js";
import initNavigationBar from "./js/features/navigationBar.js";
import { initCharacter } from "./js/features/characterSwitch.js";

window.addEventListener("DOMContentLoaded", (ev) => {
  try {
    /**@type {HTMLElement | null} */
    const container = document.querySelector("main.container");

    initRouter(container);
    initNavigationBar();
    initCharacter();
  } catch (error) {
    console.error(error);
  }
});
