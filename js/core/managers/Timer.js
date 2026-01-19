class Timer {
  /** @type {number[]} */
  static intervals = [];

  /** @type {number[]} */
  static timeouts = [];

  /**
   * @param {Function} callback
   * @param {number} delay
   */
  static setInterval(callback, delay) {
    const id = setInterval(callback, delay);
    this.intervals.push(id);
    return id;
  }

  /**
   * @param {Function} callback
   * @param {number} delay
   */
  static setTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    this.timeouts.push(id);
    return id;
  }

  /**
   * @param {number} id
   */
  static clearInterval(id) {
    clearInterval(id);
    this.intervals = this.intervals.filter(i => i !== id);
  }

  /**
   * @param {number} id
   */
  static clearTimeout(id) {
    clearTimeout(id);
    this.timeouts = this.timeouts.filter(t => t !== id);
  }

  static clearAllIntervals() {
    this.intervals.forEach(clearInterval);
    this.intervals = [];
  }

  static clearAllTimeouts() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  static clearAll() {
    this.clearAllIntervals();
    this.clearAllTimeouts();
  }
}

export default Timer;
