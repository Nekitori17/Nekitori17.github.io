import { onUnmounted, onMounted, onAfterEnter } from "./hook.js";

export { onUnmounted, onMounted, onAfterEnter }

globalThis.onMounted = onMounted;
globalThis.onUnmounted = onUnmounted;
globalThis.onAfterEnter = onAfterEnter;

