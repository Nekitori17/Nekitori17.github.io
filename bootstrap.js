import "./js/core/managers/index.js";

import { initRouter } from "./js/core/router/index.js";
import initNavigationBar from "./js/features/navigationBar.js";
import { initCharacter } from "./js/features/characterSwitch.js";

import { removeBootLoading } from "./js/features/bootLoading.js";

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

function main() {
  bootstrap();
}

main();
