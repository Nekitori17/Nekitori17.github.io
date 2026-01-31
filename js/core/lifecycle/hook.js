import { register } from "./registry.js";

/**
 * @param {(ctx?: any) => void} cb
 */
export function onMounted(cb) {
  register("mounted", cb);
}

/**
 * @param {(ctx?: any) => void} cb
 */
export function onUnmounted(cb) {
  register("unmounted", cb);
}

/**
 * @param {(ctx? :any) => void} cb
 */
export function onAfterEnter(cb) {
  register("afterEnter", cb);
}
