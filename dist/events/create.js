"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Create an event emitter.
 */
var create = function create() {
  var events = {};

  /**
   * Subscribe to an event.
   * @param {string} name
   * @param {function(...any): void} fn
   */
  var on = function on(name, fn) {
    events[name] = events[name] || [];
    events[name].push(fn);
  };

  /**
   * Subscribe to an event once.
   * @param {string} name
   * @param {function(...any): void} fn
   */
  var once = function once(name, fn) {
    var wrapper = function wrapper() {
      fn.apply(void 0, arguments);
      off(name, wrapper);
    };
    on(name, wrapper);
  };

  /**
   * Emits an event.
   * @param {string} name
   * @param  {...any} args
   */
  var emit = function emit(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var func = events[name] || [];
    func.forEach(function (fn) {
      return fn.apply(void 0, args);
    });
  };

  /**
   * Unsubscribe from an event.
   * @param {string} name
   * @param {function(...any): void} fn
   */
  var off = function off(name, fn) {
    var func = events[name] || [];
    events[name] = func.filter(function (f) {
      return f !== fn;
    });
  };
  return {
    on: on,
    once: once,
    off: off,
    emit: emit
  };
};
var _default = exports["default"] = create;