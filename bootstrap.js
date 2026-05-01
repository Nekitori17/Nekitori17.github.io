import "./js/core/managers/index.js";
import "./js/core/lifecycle/index.js";

import { initRouter } from "./js/core/router/index.js";
import initNavigationBar from "./js/modules/navigationBar.js";
import { initCharacter } from "./js/modules/characterSwitch.js";

import { removeBootLoading } from "./js/modules/bootLoading.js";

async function bootstrap() {
  try {
    initNavigationBar();

    await initCharacter(
      document.querySelector(".header .title h1"),
      document.querySelector(".header nav.navigation"),
    );

    /** @type {HTMLElement | null } */
    const container = document.querySelector("div.container");

    initRouter(container);
  } catch (error) {
    console.error("[bootstrap error]", error);
  } finally {
    removeBootLoading();
  }
}

(() => bootstrap())();
