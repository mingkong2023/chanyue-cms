const dayjs = require("dayjs");
const {
  config,
  helper: {success, fail },
} = require("../../../common/BaseController");
const CollectService = require("../service/collect.js");
const cheerio = require('cheerio');
class CollectController {

  static model = 'collect';

  static async getPages(req, res, next) {
    try {
      let arr = [];
      const { targetUrl, listTag, chartset } = req.body;
      const data = await CollectService.common(targetUrl, chartset)
      console.log(data.toString())
      const $ = cheerio.load(data.toString(), { decodeEntities: false });
      $(`${listTag}`).each(function () {
        arr.push($(this).attr('href'))
      });
      res.json({ ...success, data: arr });
    } catch (error) {
      console.log(error)
      next(error)
    }
  }


  //测试列表所有地址 
  static async getArticle(req, res, next) {
    try {
      const { taskUrl, titleTag, articleTag, removeCode, clearRegCode, chartset } = req.body;

      const data = await CollectService.common(taskUrl, chartset);
      const $ = cheerio.load(data.toString(), { decodeEntities: false });
      const title = $(`${titleTag}`).text();
      $(`${articleTag}`).find('*')
        .not('img')
        .remove('script')
        .remove('style')
        .remove('iframe')
        .remove('audio')
        .remove('video')
        .remove('noscript')
        .removeAttr('class')
        .removeAttr('id')
        .removeAttr('style')
        .each((index, element) => {
          const attributes = element.attributes;
          for (let i = attributes.length - 1; i >= 0; i--) {
            const attributeName = attributes[i].name;
            if (attributeName.startsWith('data-')) {
              $(element).removeAttr(attributeName);
            }
          }
        });

      //动态清理节点
      eval(removeCode);

      // 获取清理后的文本内容
      let articleText = $(`${articleTag}`).html().trim()
        .replace(/\r|\n/g, "").replace(/\"/g, "")
        .replace(/<span\b[^>]*>(.*?)<\/span>/gi, '$1')
        .replace(/<div\b[^>]*>(.*?)<\/div>/gi, '$1')
        .replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1')
        .replace(/<p>(\s*|<br\s*\/?>)<\/p>/g, '');

      // 动态正则替换
      const regex = new RegExp(clearRegCode, "gi");
      // 替换操作
      articleText = articleText.replace(regex, "");

      res.json({ ...success, data: { title: title, article: articleText } });
    } catch (error) {
      console.log(error)
      next(error)
    }
  }


  // 增
  static async create(req, res, next) {
    try {
      const body = req.body;
      const data = await CollectService.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 删除
  static async delete(req, res, next) {
    try {
      const id = req.query.id;
      const data = await CollectService.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  static async update(req, res, next) {
    try {
      const body = req.body;
      const data = await CollectService.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  static async detail(req, res, next) {
    try {
      const id = req.query.id;
      const data = await CollectService.detail(id);
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
      const data = await CollectService.search(key, cur, pageSize);
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
      let data = await CollectService.list(cur, pageSize);
      data.list.forEach((ele) => {
        ele.createdAt = dayjs(ele.createdAt).format("YYYY-MM-DD HH:MM");
      });
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }


}

module.exports = CollectController;
