"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _get = _interopRequireDefault(require("./get"));
var _add = _interopRequireDefault(require("./add"));
var _remove = _interopRequireDefault(require("./remove"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var notes = function notes() {
  var route = (0, _express.Router)();
  route.get("/", _get["default"]);
  route.post("/", _add["default"]);
  route["delete"]("/", _remove["default"]);
  return route;
};
var _default = exports["default"] = notes;