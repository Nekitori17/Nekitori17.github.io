export {};

declare global {
  interface Window {
    Manager: {
      EventBus: typeof import("../js/core/managers/EventBus").default;
      Timer: typeof import("../js/core/managers/Timer").default;
    };
  }
}
