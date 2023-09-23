const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const api = require("./modules/api/router.js");
const web = require(`./modules/web/router.js`);
const open = require(`./plugin/router.js`);
const init = require("./modules/web/middleware/init.js");
const { template } = require("./config/config.js");
//前台
router.use("/", web);

//接口
router.use("/api", api);

//开源api
router.use("/open", open);

//机器人抓取
router.get("/robots.txt", function (req, res, next) {
  let stream = fs.createReadStream(
    path.join(__dirname, "../public/robots.txt"),
    { flags: "r" }
  );
  stream.pipe(res);
});

//404处理
router.use(init(), (req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.ip;
  console.log("404-->", `${req.method}-${decodeURI(req.url)}-${ip}`);
  res.render(`${template}/404.html`);
});

//在所有组件挂在之后处理错误中间件
router.use((err, req, res) => {
  console.error("500-->", req.method, req.url, err);
  let data = { url: req.url, method: req.method, error: err.message };
  if (req.is("html") || req.is("html") == null) {
    res.render(`${template}/500.html`, { data });
  } else {
    res.json({ code: 500, data, msg: data.error });
  }
});

module.exports = router;
