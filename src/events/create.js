/**
 * Create an event emitter.
 */
const create = () => {
  const events = {};

  /**
   * Subscribe to an event.
   * @param {string} name
   * @param {function(...any): void} fn
   */
  const on = (name, fn) => {
    events[name] = events[name] || [];
    events[name].push(fn);
  };

  /**
   * Subscribe to an event once.
   * @param {string} name
   * @param {function(...any): void} fn
   */
  const once = (name, fn) => {
    const wrapper = (...args) => {
      fn(...args);
      off(name, wrapper);
    };

    on(name, wrapper);
  };

  /**
   * Emits an event.
   * @param {string} name
   * @param  {...any} args
   */
  const emit = (name, ...args) => {
    const func = events[name] || [];
    func.forEach((fn) => fn(...args));
  };

  /**
   * Unsubscribe from an event.
   * @param {string} name
   * @param {function(...any): void} fn
   */
  const off = (name, fn) => {
    const func = events[name] || [];
    events[name] = func.filter((f) => f !== fn);
  };

  return { on, once, off, emit };
};

export default create;
