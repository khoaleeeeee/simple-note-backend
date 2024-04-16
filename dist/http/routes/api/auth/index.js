"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _google = _interopRequireDefault(require("./google"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var auth = function auth() {
  var route = (0, _express.Router)();
  route.use("/google", (0, _google["default"])());
  return route;
};
var _default = exports["default"] = auth;