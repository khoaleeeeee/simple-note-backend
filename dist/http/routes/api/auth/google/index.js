"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _get = _interopRequireDefault(require("./get"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var google = function google() {
  var route = (0, _express.Router)();
  route.get("/", _get["default"]);
  return route;
};
var _default = exports["default"] = google;