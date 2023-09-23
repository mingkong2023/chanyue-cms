'use strict';
const BaseService = require('./base');
const {knex} = require('../../../common/BaseService.js');

class ModelService  {
  static model = 'model';
 

  // 增
  static async create(body) {
    try {
      const { model_name, table_name, status } = body;
      await knex.transaction(async trx => {
        // 新建表
        const sql_create = `CREATE TABLE ${table_name} (aid int(11) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
        const createTableStatus = await knex.raw(sql_create, []).transacting(trx);
        // 新增内容
        const sql_insert = `INSERT INTO ${ModelService.model} (model_name,table_name,status) VALUES(?,?,?)`;
        const result = await knex.raw(sql_insert, [model_name, table_name, status]).transacting(trx);
        return {
          insertStatus: result[0],
          createTableStatus: createTableStatus[0],
        };
      });
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  static async hasUse(id) {
    try {
      // 新增内容
      const hasStr = `SELECT COUNT(*) as count FROM  article a LEFT JOIN category c ON c.mid=${id} WHERE a.cid=c.id LIMIT 0,1`;
      const has = await knex.raw(hasStr)
      return has[0]
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 删
  static async delete(body) {
    try {
      const {id, table_name} = body;
      await knex.transaction(async trx => {
        // 删除模型
        const result = await knex(ModelService.model).where('id', '=', id).del().transacting(trx);
        // 删除模型下对应得字段数据
        const delField = await knex('field').where('model_id', '=', id).del().transacting(trx);
        // 删除模型对应的表
        const delTable = await knex.raw(`drop table ${table_name}`).transacting(trx);
        return {
          delModel: result === 1,
          delField: delField === 1,
          delTable: delTable === 1,
        };
      });
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }

  }

  // 改
  static async update(body) {
    const {id,old_table_name,table_name,model_name,status} = body;
    try {
      await knex.transaction(async trx => {
        const renameTable = await knex.raw(`alter table ${old_table_name} rename to ${table_name}`).transacting(trx);

        const result = await knex(ModelService.model).where('id', '=', id).update({ table_name, model_name, status }).transacting(trx);

        return {
          renameStatus: renameTable,
          updateStatus: result,
        };
      })
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }


  // 查询是否已存在模型名称
  static async findByName(model_name, table_name) {
    try {
      const result = await knex.raw(`SELECT model_name,table_name from model WHERE model_name=? or table_name=? LIMIT 0,1`, [model_name, table_name]);
      return result[0];
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 文章列表
  static async list(cur = 1, pageSize = 10) {
    try {
      const sql = `SELECT COUNT(id) as count FROM ${ModelService.model}`;
      const total = await knex.raw(sql);
      const offset = parseInt((cur - 1) * pageSize);
      const list = await knex.select(['id', 'model_name', 'table_name', 'status'])
        .from(ModelService.model)
        .limit(pageSize)
        .offset(offset)
        .orderBy('id', 'desc');
        const count = total[0].count || 1;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: +cur,
        list: list,
      };
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 查
  static async detail(id) {
    try {
      const data = await knex(ModelService.model).where('id', '=', id).select()
      return data[0];
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

}

module.exports = ModelService;
