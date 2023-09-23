'use strict';

const dayjs = require('dayjs');
const path = require('path');
const { helper: {success}} = require('../../../common/BaseController');
const ModelService = require('../service/model.js');
class ModelController  {
  // 增
  static async create(req, res, next) {
    try {
      const body = req.body;
      const has = await ModelService.findByName(body.model_name, body.table_name);
      if (has.length > 0) {
        this.fail({ msg: '模型命名已重复' });
        return;
      }
      const data = await ModelService.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 删除
  static async delete(req, res, next) {
    try {
      const body = req.body;
      const data = await ModelService.delete(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  static async update(req, res, next) {
    try {
      const body = req.body;
      const data = await ModelService.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  static async detail(req, res, next) {
    try {
      const id = req.query.id;
      const data = await ModelService.detail(id);
      res.json({ ...success, data: data});
    } catch (err) {
      next(err);
    }
  }


  // 是否被使用
  static async hasUse(req, res, next) {
    try {
      const id = req.query.id;
      const data = await ModelService.hasUse(id);
      res.json({ ...success, data:data[0] });
    } catch (err) {
      next(err);
    }
  }

  // 列表
  static async list(req, res, next) {
    try {
      const cur = req.query.cur;
      const pageSize = 10;
      const data = await ModelService.list(cur, pageSize);
      res.json({ ...success, data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ModelController;
