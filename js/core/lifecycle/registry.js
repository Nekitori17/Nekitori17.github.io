/**
 * @typedef {"mounted" | "unmounted" | "afterEnter"} LifecycleType
 */

/** @type {Record<LifecycleType, Array<(ctx?:any)=>void>>} */
const registry = {
  mounted: [],
  unmounted: [],
  afterEnter: [],
};

/**
 * @param {LifecycleType} type
 * @param {(ctx?: any) => void} cb
 */
export function register(type, cb) {
  registry[type].push(cb);
}

/**
 * @param {LifecycleType} type
 * @param {any} ctx
 */
export function run(type, ctx = null) {
  const list = registry[type];
  if (!list) return;

  list.forEach((cb) => cb(ctx));
}

/**
 * @param {LifecycleType} type
 */
export function clear(type) {
  registry[type].length = 0;
}
