const path = require("path");
module.exports = (app) => {
  const {
    config: { appRoot, views },
  } = app.locals;
  //默认web view
  const web = path.join(appRoot, `modules/web/view`);
  //合并插件中的view
  const all = [...views, web];
  app.set("view options", {
    debug: process.env.NODE_ENV != "prd",
    cache: process.env.NODE_ENV == "prd",
    minimize: true,
  });
  app.set("view engine", "html");
  app.set("views", all);
  app.engine(".html", require("express-art-template"));
};
