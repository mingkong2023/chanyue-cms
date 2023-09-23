"use strict";
module.exports = () => {
  return async (req, res, next) => {
    const userAgent = req.headers["user-agent"];
    const { helper } = req.app.locals;
    // 放入中间件
    if (!helper.pc(userAgent)) {
      res.locals.views = "h5";
    } else {
      res.locals.views = "pc";
    }
    await next();
  };
};
