"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _api = _interopRequireDefault(require("./api"));
var _logger = require("@/logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logger = (0, _logger.createLogger)("http:routes");
var routes = exports["default"] = function routes() {
  var router = (0, _express.Router)();
  router.use(function (req, res, next) {
    logger.info("Request: ".concat(req.method, " ").concat(req.originalUrl));
    next();
  });
  router.use("/api", (0, _api["default"])());
  return router;
};