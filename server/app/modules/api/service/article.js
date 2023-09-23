"use strict";

const path = require("path");
const {knex, helper: { delImg,filterImgFromStr} } = require('../../../common/BaseService.js');

const BaseService = require("./base");
async function getImgsByArticleId(id, arr) {
  const imgStr = ` SELECT img,content FROM article WHERE id=${id}`;
  const img = await knex.raw(imgStr, []);
  if (img[0].length > 0) {
    if (img[0][0].img) {
      arr.push(img[0][0].img);
    }
    const contImgArr = filterImgFromStr(img[0][0].content);
    for (let i = 0; i < contImgArr.length; i++) {
      arr.push(contImgArr[i]);
    }
  }
}
class ArticleService  {
  static model = "article";
  // 增
  static async create(body) {
    try {
      let res, mapTag;
      const { defaultParams, fieldParams } = body;
      await knex.transaction(async (trx) => {
        const result = await knex(ArticleService.model)
          .insert(defaultParams)
          .transacting(trx);
        if (result[0]) {
          // 获取最后一个文章id和栏目id
          const lastStr = `SELECT id,cid FROM ${ArticleService.model} ORDER BY id DESC LIMIT 1`;
          const lastId = await knex.raw(lastStr, []).transacting(trx);
          const { id, cid } = lastId[0][0];

          // 通过栏目id查找模型id
          const modIdStr = `SELECT mid FROM category WHERE id=${cid} LIMIT 0,1`;
          const modId = await knex.raw(modIdStr, []).transacting(trx);

          // 通过模型查找表名
          const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0][0].mid} LIMIT 0,1`;
          const tableName = await knex.raw(tableNameStr, []).transacting(trx);

          // 新增模型文章
          if (tableName[0].length > 0) {
            const fields = { ...fieldParams, aid: id };
            res = await knex(`${tableName[0][0].table_name}`)
              .insert(fields)
              .transacting(trx);
          }

          // 新增文章和标签关联
          const tags = defaultParams.tag_id
            .split(",")
            .map((item) => Number(item));
          const tagsql = [];
          tags.forEach((item) => {
            tagsql.push(`(${id},${item})`);
          });
          if (tags) {
            mapTag = await knex
              .raw(
                "INSERT INTO article_map_tag(aid,tid) VALUES " +
                  tagsql.join(","),
                []
              )
              .transacting(trx);
          }

          return result[0] ? "success" : "fail";
        }
      });
    }catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 删
  static async delete(id) {
    try {
      const ids = id.split(",");

      // 删除文章图片
      let arr = [];
      await knex.transaction(async (trx) => {
        // 批量删除模型文章
        for (let i = 0, item; i < ids.length; i++) {
          item = ids[i];

          // 通过文章id,找栏目id
          const categoryStr = `SELECT cid FROM article WHERE id=${item} LIMIT 0,1`;
          const category = await knex.raw(categoryStr, []).transacting(trx);

          // 通过栏目id查找模型id
          if (category[0].length > 0) {
            const modIdStr = `SELECT mid FROM category WHERE id=${category[0][0].cid} LIMIT 0,1`;
            const modId = await knex.raw(modIdStr, []).transacting(trx);

            // 通过模型查找表名
            if (modId[0].length > 0) {
              const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0][0].mid} LIMIT 0,1`;
              const tableName = await knex
                .raw(tableNameStr, [])
                .transacting(trx);

              if (tableName[0].length > 0) {
                // 删除模型文章
                const delModelStr = `DELETE FROM ${tableName[0][0].table_name} WHERE aid IN(${item})`;
                await knex.raw(delModelStr, []).transacting(trx);
              }
            }
          }

          // 获取批量文章缩略图和内容图片路径
          await getImgsByArticleId(item, arr);
          // 过滤外链中的图片
          arr = arr.filter((item) => {
            return item.includes("public/upload");
          });

          // 批量删除文章缩略图和文章图片
          if (arr.length > 0) {
            for (let i = 0, item; i < arr.length; i++) {
              item = arr[i];
              delImg(path.join(__dirname, "../../" + item));
            }
          }
        }

        // 批量删除文章
        const delArticleStr = `DELETE FROM ${ArticleService.model} WHERE id IN(${id})`;
        const delArticle = await knex.raw(delArticleStr, []).transacting(trx);

        // 删除关联的 tag
        const delMapTagStr = `DELETE FROM article_map_tag WHERE aid IN(${id})`;
        await knex.raw(delMapTagStr, []).transacting(trx);
        return delArticle[0].affectedRows > 0 ? "success" : "fail";
      });
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 改
  static async update(body) {
    try {
      const { id, field } = body;
      delete body.id;
      delete body.field;
      await knex.transaction(async (trx) => {
        // 通过栏目id查找模型id
        const modIdStr = `SELECT mid FROM category WHERE id=${body.cid} LIMIT 0,1`;
        const modId = await knex.raw(modIdStr, []).transacting(trx);
        // 通过模型查找表名
        const tableNameStr = `SELECT table_name FROM model WHERE id=${modId[0][0].mid} LIMIT 0,1`;
        const tableName = await knex.raw(tableNameStr, []).transacting(trx);

        if (tableName[0].length > 0) {
          await knex(`${tableName[0][0].table_name}`)
            .where("aid", "=", id)
            .update(field)
            .transacting(trx);
        }
        // 修改标签，要先全部删除关联的tag，然后再添加，因为修改标签有删除，新增等方式
        const delMapTagStr = `DELETE FROM article_map_tag WHERE aid IN(${id})`;
        await knex.raw(delMapTagStr, []).transacting(trx);
        // 新增文章和标签关联
        const tags = body.tag_id.split(",").map((item) => +item);
        const tagsql = [];
        tags.forEach((item) => {
          tagsql.push(`(${id},${item})`);
        });
        await knex
          .raw(
            "INSERT INTO article_map_tag(aid,tid) VALUES " + tagsql.join(",")
          )
          .transacting(trx);
        const result = await knex(ArticleService.model)
          .where("id", "=", id)
          .update(body)
          .transacting(trx);
        return result ? "success" : "fail";
      });
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 文章列表
  static async list(cur = 1, pageSize = 10, id) {
    try {
      // 查询个数
      let sql;
      if (id) {
        sql = `SELECT COUNT(id) as count FROM ${ArticleService.model} WHERE cid IN (${id})`;
      } else {
        sql = `SELECT COUNT(id) as count FROM ${ArticleService.model}`;
      }
      const total = await knex.raw(sql);
      const offset = parseInt((cur - 1) * pageSize);
      let list;
      if (id) {
        list = await knex
          .select([
            "id",
            "title",
            "createdAt",
            "description",
            "pv",
            "author",
            "status",
            "img",
          ])
          .from(ArticleService.model)
          .where("cid", "=", id)
          .limit(pageSize)
          .offset(offset)
          .orderBy("id", "desc");
      } else {
        list = await knex
          .select(["id", "title", "attr", "pv", "createdAt", "status"])
          .from(ArticleService.model)
          .limit(pageSize)
          .offset(offset)
          .orderBy("id", "desc");
      }
    const count = total[0][0].count;
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
      // 查询文章
      const data = await knex(ArticleService.model).where("id", "=", id).select();
      //兼容mysql错误
      if (!data[0] || !data[0].cid) {
        return false;
      }
      // 通过栏目id查找模型id
      const modId = await knex.raw(
        `SELECT mid FROM category WHERE id=? LIMIT 0,1`,
        [data[0].cid]
      );

      let field = [];
      if (modId[0].length > 0 && modId[0][0].mid !== "0") {
        // 通过模型查找表名
        const tableName = await knex.raw(
          `SELECT table_name FROM model WHERE id=?`,
          [modId[0][0].mid]
        );
        // 通过表名查找文章
        field = await knex.raw(`SELECT * FROM ? WHERE aid=? LIMIT 0,1`, [
          tableName[0][0].table_name,
          id,
        ]);
      }
      return { ...data[0], field: field[0] || {} };
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 搜索
  static async search(key = "", cur = 1, pageSize = 10, cid = 0) {
    try {
      // 查询个数
      let sql;
      const countSql = `SELECT COUNT(*) as count FROM  article a LEFT JOIN category c ON a.cid=c.id`;
      const keyStr = ` WHERE a.title LIKE \'%${key}%\'`;
      const cidStr = `  AND c.id=?`;

      if (cid === 0) {
        sql = countSql + keyStr;
      } else {
        sql = countSql + keyStr + cidStr;
      }

      const total = cid ? await knex.raw(sql, [cid]) : await knex.raw(sql, []);
      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      let sql_list = "";
      const listStart = `SELECT a.id,a.title,a.attr,a.tag_id,a.description,a.cid,a.pv,a.updatedAt,a.status,c.name,c.path FROM ${this.model} a LEFT JOIN category c ON a.cid=c.id WHERE a.title LIKE  \'%${key}%\' `;
      const listEnd = `ORDER BY a.updatedAt desc LIMIT ${offset},${parseInt(
        pageSize
      )}`;
      if (cid === 0) {
        sql_list = listStart + listEnd;
      } else {
        sql_list = listStart + `AND c.id=? ` + listEnd;
      }


      const list = cid
        ? await knex.raw(sql_list, [cid])
        : await knex.raw(sql_list, []);
        const count = total[0][0].count || 1;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: +cur,
        list: list[0],
      };
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 增加计数器
  static async count(id) {
    try {
      const result = await knex.raw(
        `UPDATE article SET pv=pv+1 WHERE id=? LIMIT 1`,
        [id]
      );
      return result[0].affectedRows ? "success" : "fail";
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 上一篇文章
  static async pre(id, cid) {
    try {
      const result = await knex.raw(
        `SELECT a.id,a.title,c.name,c.path FROM article a LEFT JOIN category c ON a.cid=c.id  WHERE a.id<? AND a.cid=? ORDER BY id DESC LIMIT 1`,
        [id, cid]
      );
      return result[0][0];
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 下一篇文章
  static async next(id, cid) {
    try {
      const result = await knex.raw(
        `SELECT a.id,a.title,c.name,c.path FROM article a LEFT JOIN category c ON a.cid=c.id WHERE a.id>? AND a.cid=? LIMIT 1`,
        [id, cid]
      );
      return result[0][0];
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // 通过栏目id获取mid，通过mid获取模型对应字段
  static async findField(cid) {
    try {
      // 查询个数
      const mid = `SELECT mid FROM category WHERE id=${cid} AND mid IS NOT NULL`;
      const _mid = await knex.raw(mid);
      let res = [];
      if (_mid[0].length > 0) {
        const field = `SELECT field_cname,field_ename,field_type,field_values,field_default,field_sort FROM field WHERE model_id=${_mid[0][0].mid} LIMIT 0,12`;
        res = await knex.raw(field);
      }
      return {
        fields: res[0],
      };
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  static async tongji() {
    const { app } = this;
    try {
      // 昨天
      const yesterdayStr =
        "select count(*) AS count from article where TO_DAYS(NOW())-TO_DAYS(updatedAt)<=1";
      const yesterday = await knex.raw(yesterdayStr);

      // 今天
      const todayStr =
        "select count(*) AS count from article where TO_DAYS(NOW())=TO_DAYS(NOW())";
      const today = await knex.raw(todayStr);

      // 7天
      const weekStr =
        "SELECT COUNT(*) AS count from article where DATE_SUB(CURDATE(),INTERVAL 7 DAY)<=DATE(updatedAt)";
      const week = await knex.raw(weekStr);

      // 30天
      const monthStr =
        "SELECT COUNT(*) AS count from article where DATE_SUB(CURDATE(),INTERVAL 30 DAY)<=DATE(updatedAt)";
      const month = await knex.raw(monthStr);

      // 季度
      const quarterStr =
        "SELECT COUNT(*) AS count from article where QUARTER(createdAt)=QUARTER(NOW())";
      const quarter = await knex.raw(quarterStr);

      // 年
      const yearStr =
        "SELECT COUNT(*) AS count from article where YEAR(createdAt)=YEAR(NOW())";
      const year = await knex.raw(yearStr);

      // 留言数
      const messageStr = "SELECT COUNT(id) AS count FROM message LIMIT 0,1";
      const message = await knex.raw(messageStr);

      return {
        yesterday: yesterday[0][0].count,
        today: today[0][0].count,
        week: week[0][0].count,
        month: month[0][0].count,
        quarter: quarter[0][0].count,
        year: year[0][0].count,
        message: message[0][0].count,
      };
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }
}

module.exports = ArticleService;
