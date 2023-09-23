"use strict";
const knex = require("../../../config/config.knex.js");

class HomeService  {
  constructor() {
  }

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
      console.error(err);
    }
  }

  // 广告
  static async ad(platform = 1, position = 1) {
    try {
      let res = await knex("ad")
        .where({
          platform: `${platform}`,
          position: `${position}`,
          status: "1",
        })
        .select(["id", "title", "mark", "imgUrl", "link"]);
      return res;
    } catch (err) {
      console.error(`platform-> ${platform} position->${position}`, err);
    }
  }

  //  指定栏目和文章 1头条 2推荐-右侧 3轮播 4热门事件
  static async getArticleListById(id, attr, len = 5) {
    try {
      // 获取所有id
      const res = await knex.raw("SELECT id FROM category WHERE pid=?", [id]);
      let ids = [id];
      res[0].forEach((item) => {
        ids.push(item.id);
      });
      ids = ids.join(",");

      // 获取栏目
      let result;
      if (attr) {
        result = await knex.raw(
          "SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.cid IN (?)  AND a.attr LIKE '%?%'  ORDER BY createdAt DESC LIMIT 0,?",
          [ids, attr, len]
        );
      } else {
        result = await knex.raw(
          "SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.cid IN (?) ORDER BY createdAt DESC LIMIT 0,?",
          [ids, len]
        );
      }
      return { list: result[0] };
    } catch (err) {
      console.error(`id->${id} attr-> ${attr} len->${len}`, err);
    }
  }

  // 全局文章  1头条 2推荐-右侧 3轮播 4热门事件
  static async getArticleList(attr, start = 0, len = 5) {
    try {
      let result;
      if (attr) {
        result = await knex.raw(
          "SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.attr LIKE '%?%'  ORDER BY a.createdAt DESC LIMIT ?,?",
          [attr, start, len]
        );
      } else {
        result = await knex.raw(
          "SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id  ORDER BY createdAt DESC LIMIT ?,?",
          [start, len]
        );
      }
      return { list: result[0] };
    } catch (err) {
      console.error(`attr-> ${attr} start->${start} len->${len}`, err);
    }
  }

  // 指定栏目或全局本月浏览pv排行
  // async getArticleMonthPvSort(id = '', len = 10) {
  //   const {
  //     app,
  //   } = this;
  //   // 初始化事务
  //   const conn = await app.mysql.beginTransaction();
  //   try {

  //     // 获取所有id
  //     const res = await conn.query('SELECT id FROM category WHERE pid=?', [ id ]);
  //     let ids = [ id ];
  //     res.forEach(item => {
  //       ids.push(item.id);
  //     });
  //     ids = ids.join(',');

  //     let sql,
  //       result;
  //     if (id) {
  //       sql = `SELECT id,title,short_title,img,description,createdAt from article WHERE cid IN (?) AND DATE_FORMAT(createdAt,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m') ORDER BY pv DESC LIMIT 0,${len}`;
  //       result = await this.app.mysql.query(sql, [ ids ]);
  //     } else {
  //       sql = `SELECT id,title,short_title,img,description,createdAt from article WHERE DATE_FORMAT(createdAt,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m') ORDER BY pv DESC LIMIT 0,${len}`;
  //       result = await this.app.mysql.query(sql, []);
  //     }

  //     // 提交事务
  //     await conn.commit();
  //     return { list: result };
  //   } catch (err) {
  //     // 异常后回滚
  //      await conn.rollback();
  //     console.error(err);
  //   }
  // }

  // 指定栏目或全局 浏览pv排行
  static async getArticlePvList(id = "", len = 10) {
    try {
      let result;
      // 获取所有id
      if (id) {
        const res = await knex.raw("SELECT id FROM category WHERE pid=?", [id]);
        let ids = [id];
        res[0].forEach((item) => {
          ids.push(item.id);
        });
        ids = ids.join(",");
        result = await knex.raw(
          "SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE cid IN (?)  ORDER BY pv DESC LIMIT 0,?",
          [ids, len]
        );
      } else {
        result = await knex.raw(
          "SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id ORDER BY pv DESC LIMIT 0,?",
          [len]
        );
      }
      return { list: result[0] };
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
    }
  }

  // 指定栏目或全局 图文排行榜 ?没测过
  static async getArticleImgList(id = "", len = 10) {
    try {
      // 获取所有id
      const res = await knex.raw("SELECT id FROM category WHERE pid=?", [id]);
      if (!res[0]) {
        return { list: [] };
      }
      let ids = [id];
      if (res[0]) {
        res[0].forEach((item) => {
          item.id && ids.push(item.id);
        });
      }
      ids = ids.join(",");

      let result;
      if (id) {
        result = await knex.raw(
          `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id  WHERE a.img!='' AND a.cid IN (?) ORDER BY createdAt DESC LIMIT 0,?`,
          [ids, len]
        );
      } else {
        result = await knex.raw(
          `SELECT a.id,a.title,a.short_title,a.img,a.createdAt,a.description,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id  WHERE img!='' ORDER BY createdAt DESC LIMIT 0,?`,
          [len]
        );
      }
      return { list: result[0] };
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
    }
  }

  static async list(id, current, pageSize) {
    try {
      let ids = [];
      const start = parseInt((current - 1) * pageSize);
      // 获取所有id
      if (id) {
        const res = await knex.raw("SELECT id FROM category WHERE pid=?", [id]);
        ids = [id];
        if (res[0].length > 0) {
          res[0].forEach((item) => {
            item.id && ids.push(item.id);
          });
        }
      }

      let idString = ids.join(",");
      // 查询个数
      let sql1 = `SELECT COUNT(id) as count FROM article WHERE cid IN (?)`;
      let sql2 = `SELECT a.id,a.title,a.short_title,a.img,a.description,a.createdAt,a.author,a.pv,c.pinyin,c.name,c.path from article AS a LEFT JOIN category as c ON a.cid = c.id WHERE a.cid IN (?) ORDER BY createdAt DESC LIMIT ?,?`;
      const total = await knex.raw(sql1, [ids]);
      const result = await knex.raw(sql2, [ids, start, pageSize]);
      const count = total[0].count || 1;
      return {
        count,
        total: Math.ceil(count / pageSize),
        current: +current,
        list: result[0],
      };
    } catch (err) {
      console.error(`id->${id} current->${current} pageSize->${pageSize}`, err);
    }
  }
}

module.exports = HomeService;
