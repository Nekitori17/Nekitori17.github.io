class EventBus {
  /** @type {Record<string, Function[]>} */
  static events = {};

  /**
   * @param {string} event
   * @param {Function} callback
   */
  static on(event, callback) {
    (this.events[event] ??= []).push(callback);
  }

  /**
   * @param {String} event
   * @param {(data: any) => void} callback
   */
  static once(event, callback) {
    /** @type {(data: any) => void} */
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  /**
   * @param {string} event
   * @param {any} data
   */
  static emit(event, data) {
    [...(this.events[event] ?? [])].forEach((cb) => cb(data));
  }

  /**
   * @param {string} event
   * @param {Function} callback
   */
  static off(event, callback) {
    this.events[event] =
      this.events[event]?.filter((cb) => cb !== callback) ?? [];
  }

  /**
   * @param {string} event
   */
  static offAll(event) {
    delete this.events[event];
  }

  static clear() {
    this.events = {};
  }
}

export default EventBus;
