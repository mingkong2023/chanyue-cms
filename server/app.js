const express = require("express");
const { port, appName, version } = require("./app/config/config");
const run = require("./app/middleware/run.js");
const app = express();
//运行
run(app);
app.listen(port, () => {
  console.log(
    ` ${appName} 启动成功！\r\n localhost:${port} 版本:${version}`
  );
});