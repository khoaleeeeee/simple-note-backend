"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _logger = require("@/logger.js");
var _openai = _interopRequireDefault(require("./openai"));
var _notes = _interopRequireDefault(require("./notes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logger = (0, _logger.createLogger)("http:routes:api");
var api = function api() {
  var route = (0, _express.Router)();
  route.use("/notes", (0, _notes["default"])());
  route.use("/openai", (0, _openai["default"])());

  // catch all errors
  route.use(function (err, _req, res, _next) {
    logger.error(err.stack || err.message);
    res.status(400).json({
      error: {
        message: err.message,
        code: err.code
      }
    });
  });
  return route;
};
var _default = exports["default"] = api;