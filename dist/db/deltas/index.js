"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "add", {
  enumerable: true,
  get: function get() {
    return _add["default"];
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function get() {
    return _get["default"];
  }
});
var _get = _interopRequireDefault(require("./get"));
var _add = _interopRequireDefault(require("./add"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var index = exports["default"] = {
  get: _get["default"],
  add: _add["default"]
};