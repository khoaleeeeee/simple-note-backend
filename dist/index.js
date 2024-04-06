"use strict";

require("./alias");
var _server = _interopRequireDefault(require("./http/server"));
var _logger = require("./logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logger = (0, _logger.createLogger)("src:index");
_server["default"].emitter.on("ready", function () {
  logger.info("Http server is ready");
});
_server["default"].start().then(function () {
  logger.info("Http server is started");
});