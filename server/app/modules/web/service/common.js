"use strict";

const { knex } = require('../../../common/BaseService.js');

class CommonService {
  constructor() { }

  // 网站栏目
  static async category() {
    try {
      let res = await knex("category").select([
        "id",
        "pid",
        "name",
        "pinyin",
        "path",
        "sort",
        "target",
        "status",
        "type",
      ]);
      return res;
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  /**
   * @description 通用查询全局文章,不区分栏目
   * @param {*} start 开始
   * @param {*} len 查询个数
   * @param {*} attr 1头条 2推荐 3轮播 4热门
   * @returns {Array}
   */
  static async getArticleList(start = 0, len = 5, attr = "") {
    try {
      const columns = [
        "a.id",
        "a.title",
        "a.short_title",
        "a.img",
        "a.createdAt",
        "a.description",
        "a.link",
        "c.pinyin",
        "c.name",
        "c.path",
      ];

      const query = knex
        .select(columns)
        .from("article AS a")
        .leftJoin("category AS c", "a.cid", "c.id")
        .orderBy("a.createdAt", "DESC")
        .limit(len)
        .offset(start);

      if (attr) {
        query.where("a.attr", "LIKE", `%${attr}%`);
      }

      const result = await query;
      return result;
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  /**
   * @description 通用查询全局文章区分栏目
   * @param {*} cid 栏目id
   * @param {*} len 查询个数
   * @param {*} attr 1头条 2推荐 3轮播 4热门
   * @returns {Array}
   */
  static async getArticleListByCid(cid, len = 5, attr = "") {
    try {
      // 获取所有id
      const res = await knex.select("id").from("category").where("pid", cid);

      const ids = [cid, ...res.map((item) => item.id)];
      // 构建查询条件
      let queryBuilder = knex
        .select(
          "a.id",
          "a.title",
          "a.short_title",
          "a.img",
          "a.createdAt",
          "a.description",
          "c.pinyin",
          "c.name",
          "c.path"
        )
        .from("article AS a")
        .leftJoin("category AS c", "a.cid", "c.id")
        .whereIn("a.cid", ids)
        .orderBy("createdAt", "DESC")
        .limit(len);

      if (attr) {
        queryBuilder = queryBuilder.andWhere("a.attr", "LIKE", `%${attr}%`);
      }

      // 执行查询
      const result = await queryBuilder;
      return result;
    } catch (err) {
      console.error(`cid->${cid} attr-> ${attr} len->${len}`, err);
      throw new Error(err)
    }
  }

  /**
   * @description 通过文章id查找对应的tag标签
   * @param {Number} aid 文章id
   * @returns {Array} 返回数组
   */
  static async getTagsFromArticleByAid(aid) {
    try {
      let queryBuilder = await knex("article AS a")
        .select("a.cid", "t.id", "t.name", "t.path")
        .rightJoin("tag AS t", "t.id", "=", "a.tag_id")
        .where("a.id", aid)
        .limit(10)
        .offset(0);
      // 执行查询
      const result = await queryBuilder;
      return result;
    } catch (err) {
      console.error(`aid->${aid}`, err);
      throw new Error(err)
    }
  }

  /**
   * @description 返回所有的根栏目
   * @returns {Array}
   */
  static async getAllParentCategory() {
    try {
      const result = await knex("category")
        .select([
          "id",
          "pid",
          "name",
          "pinyin",
          "path",
          "sort",
          "target",
          "status",
          "type",
        ])
        .where("pid", 0)
        .where("type", 0);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  }


  /**
   * @description 浏览pv排行(全局|指定栏目)
   * @param {Number|String} id 栏目id
   * @param {Number} len 默认10条
   * @returns 
   */
  static async getArticlePvList(len = 10, id = "") {
    try {

      let query = knex
        .select(
          'a.id',
          'a.title',
          'a.short_title',
          'a.img',
          'a.createdAt',
          'a.description',
          'c.pinyin',
          'c.name',
          'c.path'
        )
        .from('article AS a')
        .leftJoin('category AS c', 'a.cid', 'c.id');

      if (id) {
        const ids = await knex('category')
          .select('id')
          .where('pid', id)
          .pluck('id');

        ids.push(id);
        query.whereIn('cid', ids);
      }

      query.orderBy('pv', 'DESC').limit(len);
      let result = await query;
      return result;
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
      throw new Error(err)
    }
  }

  /**
  * @description 最新图文(全局|指定栏目)
  * @param {Number|String} id 栏目id
  * @param {Number} len 默认10条
  * @param {*} attr 1头条 2推荐 3轮播 4热门
  * @returns 
  */
  static async getNewImgList(len = 10, id = "", attr = '') {
    try {
      let query = knex
        .select(
          'a.id',
          'a.title',
          'a.short_title',
          'a.img',
          'a.createdAt',
          'a.description',
          'c.pinyin',
          'c.name',
          'c.path'
        )
        .from('article AS a')
        .leftJoin('category AS c', 'a.cid', 'c.id')
        .where('a.img', '!=', '');

      if (id) {
        const ids = await knex('category')
          .select('id')
          .where('pid', id)
          .pluck('id');

        ids.push(id);
        query.whereIn('a.cid', ids);
      }

      if (attr) {
        query.where("a.attr", "LIKE", `%${attr}%`);
      }
      query.orderBy('a.createdAt', 'DESC').limit(len);

      let result = await query;
      return result;
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
      throw new Error(err)
    }
  }


  /**
  * @description 文章列表
  * @param {Number} id 栏目id
  * @param {Number|String} current 当前页面
  * @param {Number} pageSize 默认10条
  * @returns {Array} 
  */
  static async list(id, current = 1, pageSize = 10) {
    try {
      const start = (current - 1) * pageSize;

      // 获取所有id
      let ids = [id];
      const res = await knex('category')
        .select('id')
        .where('pid', id);

      res.forEach((item) => {
        ids.push(item.id);
      });

      // 查询个数
      const total = await knex('article')
        .count('id as count')
        .whereIn('cid', ids)
        .first();

      const count = total.count || 1;

      // 查询文章列表
      const result = await knex
        .select(
          'a.id',
          'a.title',
          'a.short_title',
          'a.img',
          'a.description',
          'a.createdAt',
          'a.author',
          'a.pv',
          'c.pinyin',
          'c.name',
          'c.path'
        )
        .from('article AS a')
        .leftJoin('category AS c', 'a.cid', 'c.id')
        .whereIn('a.cid', ids)
        .orderBy('a.createdAt', 'DESC')
        .offset(start)
        .limit(pageSize);

      return {
        count,
        total: Math.ceil(count / pageSize),
        current: +current,
        list: result,
      };
    } catch (err) {
      console.error(`id->${id} current->${current} pageSize->${pageSize}`, err);
      throw new Error(err)
    }
  }


  /**
   * @description tag搜索
   * @param {Number} tag tagpath
   * @param {Number|String} current 当前页面
   * @param {Number} pageSize 默认10条
   * @returns {Array} 
   */
  static async tags(path, current = 1, pageSize = 10) {
    try {
      const start = (current - 1) * pageSize;

      // 查询个数
      const total = await knex('article as a')
        .join('category as c', 'a.cid', 'c.id')
        .whereExists(function () {
          this.select(1)
            .from('tag as t')
            .whereRaw('FIND_IN_SET(t.id, a.tag_id) > 0')
            .andWhere('t.path', path);
        })
        .count('* as total');

      // 查询文章列表
      const result = await knex('article as a')
        .select(
          'a.id',
          'a.title',
          'a.short_title',
          'a.img',
          'a.description',
          'a.createdAt',
          'a.author',
          'a.pv',
          'c.pinyin',
          'c.name',
          'c.path',
        )
        .join('category as c', 'a.cid', 'c.id')
        .whereExists(function () {
          this.select(1)
            .from('tag as t')
            .whereRaw('FIND_IN_SET(t.id, a.tag_id) > 0')
            .andWhere('t.path', path);
        })
        .orderBy('a.createdAt', 'DESC')
        .offset(start)
        .limit(pageSize);

      const count = total.total || 1;

      return {
        count,
        total: Math.ceil(count / pageSize),
        current: +current,
        list: result,
      };
    } catch (err) {
      console.error(`id->${path} current->${current} pageSize->${pageSize}`, err);
      throw new Error(err)
    }
  }


  /**
   * @description 通过文章id获取tags
   * @param {*} articleId 
   * @returns {Array} 返回数组 
   */
  static async fetchTagsByArticleId(articleId) {
    try {
      const tags = await knex('tag')
        .select('tag.id', 'tag.path', 'tag.name')
        .join('article', knex.raw(`article.tag_id LIKE CONCAT('%', tag.id, '%')`))
        .where('article.id', articleId)
        .limit(10);
      return tags;
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  };
}

module.exports = CommonService;
