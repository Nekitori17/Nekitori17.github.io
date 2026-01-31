import EventBus from "./EventBus.js";
import Timer from "./Timer.js";

export { EventBus, Timer }

globalThis.EventBus = EventBus;
globalThis.Timer = Timer;