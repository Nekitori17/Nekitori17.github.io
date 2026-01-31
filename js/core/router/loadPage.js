import { run } from "../lifecycle/registry.js";
import delay from "./../utils/delay.js";

/**@type {AbortController | null} */
let pageAbortController = null;

/**
 * @param {string} pageName
 * @param {HTMLElement} container
 */
export async function loadPage(pageName, container) {
  if (pageAbortController) {
    pageAbortController.abort();
  }
  pageAbortController = new AbortController();

  const pageSrc = `/pages/${pageName}/index.html`;

  try {
    const res = await fetch(pageSrc, {
      signal: pageAbortController.signal,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to load page: ${res.status}`);
    }

    const pageContent = await res.text();

    document.body.style.overflow = "hidden";
    container.style.opacity = "0";

    await delay(300);

    run("unmounted");
    clearAutoLoadedScripts();
    container.replaceChildren();

    const tpl = document.createElement("template");
    tpl.innerHTML = pageContent;

    const scripts = tpl.content.querySelectorAll("script");

    scripts.forEach((script) => {
      const newScript = document.createElement("script");

      if (script.src) newScript.src = script.src;
      else newScript.textContent = script.textContent;

      if (script.type) newScript.type = script.type;

      newScript.dataset.pageScript = "true";
      document.body.appendChild(newScript);

      script.remove();
    });

    container.appendChild(tpl.content);
    run("mounted");

    sessionStorage.setItem("pageSession", pageName);

    container.style.opacity = "1";
    await delay(300);

    run("afterEnter")
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;

    console.error(err);
  } finally {
    document.body.style.overflow = "auto";
  }
}

function clearAutoLoadedScripts() {
  document
    .querySelectorAll("script[data-page-script]")
    .forEach((s) => s.remove());

  Timer.clearAll();
}
