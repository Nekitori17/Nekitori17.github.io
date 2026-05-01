import delay from "../core/utils/delay.js";

/**
 * @returns {Promise<void>}
 */
export async function startPhase1() {
  const el = document.querySelector("#boot-loading");
  if (!el) return;

  el.classList.add("boot-phase-1");
  
  await delay(1400);
  
  el.classList.remove("boot-phase-1");
  el.classList.add("boot-hold");
}

/**
 * @returns {Promise<void>}
 */
export async function removeBootLoading() {
  const el = document.querySelector("#boot-loading");
  if (!el) return;

  el.classList.remove("boot-hold");
  el.classList.add("boot-phase-2");

  await delay(1050);
  
  el.remove();
}
