"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _autocomplete = _interopRequireDefault(require("./autocomplete"));
var _express = require("express");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var openai = function openai() {
  var route = (0, _express.Router)();
  route.post("/autocomplete", _autocomplete["default"]);
  return route;
};
var _default = exports["default"] = openai;