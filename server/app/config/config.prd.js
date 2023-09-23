"use strict";
const fs = require("fs");
const path = require("path");

const config = {};
config.version = "v1.4";
config.appName = "chanyue-cms";
config.appRoot = path.join(__dirname, "../");

// cookie sign key
config.keys = "chanyue-cms_202301032044";
config.port = "81";

// add mysql config
config.mysql = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456",
  database: "chanyue",
};

config.token = {
  KEY: "chanyue-cms", // JSON WEB TOKEN KEY
  TIME: "1d", // 失效时间 10
};

config.secret = {
  key: "chanyue-cms", // md5 加盐
};

//微信小程序配置
config.weixin = {
  appid: "xxx",
  secret: "xxx",
};

// 关闭csrf
config.security = {
  csrf: {
    enable: false,
  },
};

// 配置上传
config.multipart = {
  fileSize: "50mb",
  mode: "stream",
  whitelist: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".zip",
    ".gz",
    ".tgz",
    ".gzip",
    ".mp3",
    ".mp4",
    ".avi",
  ],
  fileExtensions: [".pdf", ".txt"], // 扩展几种上传的文件格式
};

// 模板配置
// config.view = {
//     defaultViewEngine: 'ejs',
//     mapping: {
//         '.html': 'ejs', // 左边写成.html后缀，会自动渲染.html文件
//     },
// };

config.static = {
  prefix: "/public/",
  dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
  dir: ["app/public"],
  maxAge: 0, // in prod env, 0 in other envs
  buffer: false, // in prod env, false in other envs
  preload: false,
};

//sql debug
config.debug = false;

// add your user config here
config.template = "default";
config.apiService = "api";

// 七牛云上传相关配置
config.qiniuOss = {
  accessKey: "xxx", //ak
  secretKey: "xxx", //sk
  domain: "xxx", //域名
  bucket: "xxx", //空间名称
};
config.upload = "default"; // default 普通上传 qiniuyun 七牛云上传

config.views = [path.join(config.appRoot, `plugin/open/view`)];

module.exports = config;
