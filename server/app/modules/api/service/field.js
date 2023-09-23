'use strict';
const BaseService = require('./base');
const path = require('path');
const {knex} = require('../../../common/BaseService.js');
class FieldService {
  static model = 'field';

  // 增
  static async create(body) {
    try {
      // 新增字的同时需要新增表
      const { model_id, field_cname, field_ename, field_type, field_values, field_default, field_sort } = body;
      await knex.transaction(async trx => {
        // 查询模块名称
        let table_name = await knex.raw('SELECT table_name FROM model WHERE id=?', [model_id]).transacting(trx);;
        table_name = table_name[0][0].table_name;
        const result = await knex(FieldService.model).insert({ model_id, field_cname, field_ename, field_type, field_values, field_default, field_sort }).transacting(trx);

        // result 返回是新增[id]

        let sql = '';
        if (result[0]) {
          // 1单行文本（varchar）2.多行文本 text 3.下拉菜单 text 4.单选 text 5.多选 6.时间和日期
          if (field_type === '1') {
            sql = 'varchar(100) not null default \'\'';
          }
          if (field_type === '2') {
            sql = 'varchar(250) not null default \'\'';
          }
          if (field_type === '3') {
            sql = 'varchar(100) not null default \'\'';
          }
          if (field_type === '4') {
            sql = 'varchar(50) not null default \'\'';
          }
          if (field_type === '5') {
            sql = 'varchar(50) not null default \'\'';
          }
          if (field_type === '6') {
            sql = 'datetime default null';
          }
        }

        const res = await knex.raw(`alter table ${table_name} add ${field_ename} ${sql}`).transacting(trx);
        return res ? 'success' : 'fail';
      });

    } catch (err) {
      console.error(err)
      throw new Error(err)
    }

  }

  // 删 先删除field数据表中的数据 在删除对应表中的字段名称 2020-10-08
  // "alter table ${table_name} drop column ${fieldName}"

  static async delete(id, table_name) {
    try {
      await knex.transaction(async trx => {
        // 查询需要删除的字段
        const field = await knex.raw('SELECT model_id,field_ename FROM field WHERE id=?', [id]).transacting(trx);
        const { field_ename, model_id } = field[0][0];
        // 查询模型表名
        const table = await knex.raw('SELECT table_name FROM model WHERE id=?', [model_id]).transacting(trx);
        table_name = table[0][0].table_name;
        // 删除数据
        const result = await knex(FieldService.model).where('id', '=', id).del().transacting(trx);
        // 删除对应模型表中的字段
        if (result > 0) {
          const res = await knex.raw(`alter table ${table_name} drop column ${field_ename}`).transacting(trx);
        }
        return result ? 'success' : 'fail';
      });
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 改
  static async update(body) {
    const { id } = body;
    delete body.id;
    try {
      const result = await knex(FieldService.model).where('id', '=', id).update(body)
      return result ? 'success' : 'fail';
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 查询是否存在重复字段名

  static async findByName(field_cname, field_ename) {
    try {
      const result = await knex.raw('SELECT field_cname,field_ename from field WHERE field_cname=? or field_ename=? LIMIT 0,1', [field_cname, field_ename]);
      return result[0];
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 文章列表
  static async list(model_id, cur = 1, pageSize = 10) {
    try {
      // 查询个数
      const sql = `SELECT COUNT(id) as count FROM ${FieldService.model}`;
      const total = await knex.raw(sql);
      // 列表
      const offset = parseInt((cur - 1) * pageSize);
      const list = await knex.select(['id', 'field_cname', 'field_ename', 'field_sort'])
        .from(FieldService.model).where('model_id', '=', model_id)
        .limit(pageSize)
        .offset(offset)
        .orderBy('id', 'desc');

      // 查询模块名称
      const model = await knex.raw('SELECT model_name,table_name FROM model WHERE id=?', [model_id]);
      const count = total[0].count || 1;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: +cur,
        list: list,
        model: model[0],
      };
    } catch (err) {
      console.error(err);

    }
  }

  // 查
  static async detail(id) {
    try {
      const data = await knex(FieldService.model).where('id', '=', id).select()
      return data[0];
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

}

module.exports = FieldService;
