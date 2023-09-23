"use strict";
module.exports = () => {
  return async (req, res, next) => {
    const token = req.cookies.token || req.headers.auth;
    if (token) {
      const { helper, config } = req.app.locals;
      try {
        await helper.getToken(token, config.token.KEY);
        await next();
      } catch (error) {
        res.json({
          code: 501,
          msg: error,
        });
      }
    } else {
      res.json({
        code: 501,
        msg: "token缺失",
      });
    }
  };
};
