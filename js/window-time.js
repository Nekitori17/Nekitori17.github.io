const originalSetTimeout = window.setTimeout;
const originalSetInterval = window.setInterval;

const TimeoutIntervalManager = {
  timeouts: [],
  intervals: [],

  setTimeout(callback, delay) {
    const id = originalSetTimeout(callback, delay);
    this.timeouts.push(id);
    return id;
  },

  setInterval(callback, delay) {
    const id = originalSetInterval(callback, delay);
    this.intervals.push(id);
    return id;
  },

  async clearAll() {
    this.timeouts.forEach(id => clearTimeout(id));
    this.intervals.forEach(id => clearInterval(id));
    this.timeouts = [];
    this.intervals = [];
  }
};

window.setTimeout = function(callback, delay) {
  return TimeoutIntervalManager.setTimeout(callback, delay);
};

window.setInterval = function(callback, delay) {
  return TimeoutIntervalManager.setInterval(callback, delay);
};