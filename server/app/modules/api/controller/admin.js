"use strict";
const dayjs = require("dayjs");
const svgCaptcha = require("svg-captcha");
const AdminService = require("../service/admin.js");
const {
  config,
  helper: { md5, setToken, success, fail },
} = require("../../../common/BaseController");

class AdminController {
  // 登录
  static async login(req, res, next) {
    try {
      let { username, password } = req.body;
      const pass = md5(password + config.secret.key);
      const result = await AdminService.find(username, pass);
      if (result) {
        const { id, status } = result;
        // 设置token
        const token = setToken(
          { uid: id, username },
          config.token.KEY,
          config.token.TIME
        );
        const data = { id, status, username, token };
        res.json({ ...success, data: data });
      } else {
        res.json({ ...fail, data: null, msg: "登录失败" });
      }
    } catch (err) {
      next(err);
    }
  }

  // 增
  static async create(req, res, next) {
    try {
      const body = req.body;
      body.password = md5(body.password + config.secret.key);
      body.createdAt = dayjs(body.createdAt).format("YYYY-MM-DD HH:mm:ss");
      body.updatedAt = dayjs(body.updatedAt).format("YYYY-MM-DD HH:mm:ss");
      const data = await AdminService.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 删除
  static async delete(req, res, next) {
    try {
      const id = req.query.id;
      const data = await AdminService.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  static async update(req, res, next) {
    try {
      const body = req.body;
      body.password = md5(body.password + config.secret.key);
      body.createdAt = dayjs(body.createdAt).format("YYYY-MM-DD HH:mm:ss");
      body.updatedAt = dayjs(body.updatedAt).format("YYYY-MM-DD HH:mm:ss");
      const data = await AdminService.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  static async detail(req, res, next) {
    try {
      const id = req.query.id;
      const data = await AdminService.detail(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 搜索
  static async search(req, res, next) {
    try {
      const cur = req.query.cur;
      const key = req.query.keyword;
      const pageSize = 10;
      const data = await AdminService.search(key, cur, pageSize);
      data.list.forEach((ele) => {
        ele.createdAt = dayjs(ele.createdAt).format("YYYY-MM-DD HH:MM");
      });
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 列表
  static async list(req, res, next) {
    try {
      const cur = req.query.cur;
      const pageSize = 10;
      let data = await AdminService.list(cur, pageSize);
      data.list.forEach((ele) => {
        ele.createdAt = dayjs(ele.createdAt).format("YYYY-MM-DD HH:MM");
      });
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 获取验证码
  static async captcha(req, res, next) {
    try {
      const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 36,
        width: 100,
        height: 32,
        ignoreChars: "0oO1ilI", // 验证码字符中排除 0o1i
        noise: 3,
        // background: '#cc9966',
      });
      res.cookie("captcha", captcha.text);
      res.type = "image/svg+xml"; // 知道你个返回的类型
      res.end(captcha.data); // 返回一张图片
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
