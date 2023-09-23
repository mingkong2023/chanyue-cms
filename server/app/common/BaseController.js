"use strict";
const config = require("../config/config.js");
const helper = require("../extend/helper.js");
class BaseController {
  static config = config;
  static helper = helper;
}
module.exports = BaseController;
