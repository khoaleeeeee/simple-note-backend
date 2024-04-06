"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createLogger = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var getFormat = function getFormat(label) {
  return _winston["default"].format.combine(_winston["default"].format.label({
    label: label
  }), _winston["default"].format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss.SSS"
  }), _winston["default"].format.printf(function (info) {
    return "".concat(info.timestamp, " [").concat(info.level.toUpperCase(), "] (").concat(info.label, ") ").concat(info.message);
  }));
};
var getTransports = function getTransports(label) {
  return [new _winston["default"].transports.Console({
    format: _winston["default"].format.combine(getFormat(label), _winston["default"].format.colorize({
      all: true
    }))
  }),
  // TODO: use database to store the logs instead.
  new _winston["default"].transports.File({
    filename: "logs/combined.log"
  })];
};
var createLogger = exports.createLogger = function createLogger(label) {
  var transports = getTransports(label);
  return _winston["default"].createLogger({
    level: "info",
    format: getFormat(label),
    transports: transports
  });
};
var index = exports["default"] = {
  createLogger: createLogger
};