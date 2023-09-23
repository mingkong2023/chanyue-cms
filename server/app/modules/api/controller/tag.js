'use strict';
const dayjs = require('dayjs');
const path = require('path');

const {helper: {success}} = require('../../../common/BaseController');

const TagService = require('../service/tag.js');

class TagController  {

  

  // 增
  static async create(req, res, next) {
    try {
      const body = req.body;
      const data = await TagService.create(body);
      res.json({ ...success, data: data })
    } catch (err) {
      next(err);
    }
  }

  // 删除
  static async delete(req, res, next) {
    try {
      const id = req.query.id;
      const data = await TagService.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  static async update(req, res, next) {
    try {
      const body = req.body;
      const data = await TagService.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  static async detail(req, res, next) {
    try {
      const id = req.query.id;
      const data = await TagService.detail(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 列表
  static async list(req, res, next) {
    try {
      const cur = req.query.cur;
      const pageSize = 50;
      const data = await TagService.list(cur, pageSize);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }


  static async has(req, res, next) {
    try {
      const path = req.query.path;
      const data = await TagService.has(path);
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
      const pageSize = req.query.pageSize || 10;
      const data = await TagService.search(key, cur, pageSize);
      
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = TagController;
