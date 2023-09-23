"use strict";
const {
  config,
  knex,
  helper: { success, fail, filterBody },
} = require("../../../common/BaseService.js");
const { Readable } = require('stream');

const axios = require('axios');
class OpenController {
  //60秒读懂世界
  static async news60s(req, res, next) {
    try {
      const url = `https://api.qqsuu.cn/api/dm-60s?type=json`;

      if (global.fetch) {
        const result = await fetch(url);
        const { name, time, data } = await result.json();
        res.render(`60s.html`, { name, time, data });
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
        res.render(`jianbao.html`, { data });
      }
      next({ message: "当前node版本还不支持fetch" });
    } catch (error) {
      next(error);
    }
  }

  static async getIp() {
    try {
      if (global.fetch) {
        const url = `https://qifu-api.baidubce.com/ip/local/geo/v1/district`;
        const result = await fetch(url);
        const { name, time, data } = await result.json();
        res.render(`jianbao.html`, { data });
      }
      next({ message: "当前node版本还不支持fetch" });
    } catch (error) {
      next(error);
    }
  }


  static async pdf(req, res, next) {
    try {
      const pdfRemotePath = req.query.file || "";
      const response = await axios.get(pdfRemotePath, { responseType: 'arraybuffer' });
      if (response.status !== 200) {
        next({ message: "Failed to fetch PDF file" });
      }
      const buffer = Buffer.from(response.data);
      const stream = Readable.from(buffer);
      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OpenController;
