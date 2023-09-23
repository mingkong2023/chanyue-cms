"use strict";
const { success } = require("../../extend/api.js");

class OpenController {
  //60秒读懂世界
  static async news60s(req, res, next) {
    try {
      const url = `https://api.qqsuu.cn/api/dm-60s?type=json`;

      if (global.fetch) {
        const result = await fetch(url);
        const { name, time, data } = await result.json();
        res.render(`web/open/60s.html`, { name, time, data });
      }
      next({ message: "当前node版本还不支持fetch" });
    } catch (error) {
      next(error);
    }
  }

  //简报
  static async jianbao(req, res, next) {
    try {
      if (global.fetch) {
        const url = `https://api.qqsuu.cn/api/dm-bulletin`;
        const result = await fetch(url);
        const { name, time, data } = await result.json();
        res.render(`web/open/jianbao.html`, { data });
      }
      next({ message: "当前node版本还不支持fetch" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OpenController;
