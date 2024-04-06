"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _logger = require("@/logger.js");
var _events = require("events");
var _routes = _interopRequireDefault(require("./routes"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var emitter = new _events.EventEmitter();
var server = null;
var app = null;
var PORT = 8001;
var logger = (0, _logger.createLogger)("src:http:index");
logger.info("Starting server on port ".concat(PORT));
app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use("/", (0, _routes["default"])());
var start = function start() {
  return new Promise(function (resolve, reject) {
    server = app.listen(PORT, function () {
      logger.info("Server listening on port ".concat(PORT));
      emitter.emit("ready");
      resolve();
    });
  });
};
var _default = exports["default"] = {
  start: start,
  emitter: emitter
};