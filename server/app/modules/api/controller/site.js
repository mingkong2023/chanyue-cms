'use strict';

const {helper: {success}} = require('../../../common/BaseController');
const path = require('path');
const SiteService = require('../service/site.js');

class SiteController  {

  // 查
  static async find(req, res, next) {
    try {
      const data = await SiteService.find();
      res.json({ ...success, data: data })
    } catch (err) {
      next(err);
    }
  }


  // 增 
  static async create(req, res, next) {
    try {
      const body = req.body;
      const data = await SiteService.create(body);
      res.json({ ...success, data: data })
    } catch (err) {
      next(err);
    }
  }

  // 删除
  static async delete(req, res, next) {
    try {
      const id = req.query.id;
      const data = await SiteService.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  static async updateInfo(req, res, next) {
    try {
      const body = req.body;
      const data = await SiteService.updateInfo(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  static async updateSeo(req, res, next) {
    try {
      const body = req.body;
      const data = await SiteService.updateSeo(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  static async findId(req, res, next) {
    try {
      const id = req.query.id;
      const data = await SiteService.find(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 获取磁盘信息
  static async runEnv(req, res, next) {
    try {
      const dirname = path.join(__dirname, '../../../../');
      res.json({ ...success, data:{dirname: dirname} });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = SiteController;
