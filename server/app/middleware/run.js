const express = require("express");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const path = require("path");
const auth = require("./auth.js");
const helper = require("../extend/helper.js");
const config = require("../config/config.js");
const { appRoot, cookieKey } = config;

const view = require("./view.js");
const router = require("../router.js");
module.exports = function (app) {
  //挂载配置
  app.locals.config = config;
  app.locals.auth = auth;
  app.locals.helper = helper;

  // favicon 图标
  app.use(favicon(path.join(appRoot, "public/favicon.ico")));

  //cookie
  app.use(cookieParser(cookieKey));

  //解析接口 json & url
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //配置模板引擎
  view(app);

  //使用静态资源
  app.use("/public", express.static(path.join(appRoot, "public")));

  //路由
  app.use(router);
};
