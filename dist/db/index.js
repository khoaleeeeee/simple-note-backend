"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
Object.defineProperty(exports, "deltas", {
  enumerable: true,
  get: function get() {
    return _deltas["default"];
  }
});
Object.defineProperty(exports, "notes", {
  enumerable: true,
  get: function get() {
    return _notes["default"];
  }
});
Object.defineProperty(exports, "query", {
  enumerable: true,
  get: function get() {
    return _pg["default"];
  }
});
Object.defineProperty(exports, "users", {
  enumerable: true,
  get: function get() {
    return _users["default"];
  }
});
var _pg = _interopRequireDefault(require("@/pg"));
var _users = _interopRequireDefault(require("./users"));
var _notes = _interopRequireDefault(require("./notes"));
var _deltas = _interopRequireDefault(require("./deltas"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = {
  query: _pg["default"],
  notes: _notes["default"],
  users: _users["default"],
  deltas: _deltas["default"]
};