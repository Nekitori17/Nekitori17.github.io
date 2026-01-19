import "./js/core/managers/index.js";

import { initRouter } from "./js/core/router/index.js";
import initNavigationBar from "./js/features/navigationBar.js";

window.addEventListener("DOMContentLoaded", (ev) => {
  try {
    /**@type {HTMLElement | null} */
    const container = document.querySelector("main.container");

    initRouter(container);
    initNavigationBar();
  } catch (error) {
    console.error(error);
  }
});