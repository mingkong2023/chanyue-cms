
const { helper: { filterFields, formatDay } } = require('../../../common/BaseService.js');
const CommonService = require("./common.js");
class HomeService {
  constructor() { }
  // 首页
  static async home() {
    try {
      //轮播图
      let slide = await CommonService.getArticleList(0, 5, 3);
      const slideField = ["id", "title", "path", "link", "img"];
      slide = filterFields(slide, slideField);

      //头条
      let top = await CommonService.getArticleList(0, 1, 1);
      const topField = ["id", "title", "path", "description", "img"];
      top = filterFields(top, topField);

      //最新文章
      let news = await CommonService.getArticleList(0, 4);
      const newField = ["id", "title", "path", "createdAt"];
      news = filterFields(news, newField);

      let topnews = { top: top[0], news };

      //主栏目-图-文
      let cate = await CommonService.getAllParentCategory();
      const cateField = ["id", "name", "path", "pinyin"];
      cate = filterFields(cate, cateField);
      let article = [];
      for (let i = 0, item; i < cate.length; i++) {
        let item = cate[i];
        let tags = [];
        // 推荐
        let top = await CommonService.getArticleListByCid(item.id, 1, 2);
        // 最新
        let list = await CommonService.getArticleListByCid(item.id, 4);
        list = formatDay(list);

        // tag列表
        for (let j = 0, sub; j < list.length; j++) {
          sub = list[j];
          let res = await CommonService.getTagsFromArticleByAid(sub.id);
          tags.push(...res);
        }
        article.push({ top, list, tags, category: item })
      }

      //图片列表(10条)
      let imgs = await CommonService.getNewImgList(8);
      const imgsField = ["id", "title", "path", "img"];
      imgs = filterFields(imgs, imgsField);

      //推荐（10条）
      let recommend = await CommonService.getArticleList(0, 10, 2);

      //推荐带图片
      let recommendImgs = await CommonService.getNewImgList(10, '', 2);
      const recommendImgsField = ["id", "title", "path", "img", "description"];
      recommendImgs = filterFields(recommendImgs, recommendImgsField);

      return { slide, topnews, article, imgs, recommend, recommendImgs };
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  }


  // 列表页
  static async list(id, currentPage = 1, pageSize = 10) {
    try {
      // 文章列表
      const data = await CommonService.list(id, currentPage, pageSize);
      data.list = formatDay(data.list);
      // 本类推荐
      let recommend = await CommonService.getArticleListByCid(id, 5, 2);
      // 本类热门
      let hot = await CommonService.getArticlePvList(10, id);
      const hotField = ["id", "title", "path"];
      hot = filterFields(hot, hotField);
      // 本类图文
      const imgs = await CommonService.getNewImgList(10, id);
      return { data, recommend, hot, imgs };
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  }


  // 文章页
  static async article(id) {
    try {
      // 本类最新
      let news = await CommonService.getArticleListByCid(id, 10);
      // 本类热门
      let hot = await CommonService.getArticlePvList(10, id);
      const hotField = ["id", "title", "path"];
      hot = filterFields(hot, hotField);
      // 本类图文
      const imgs = await CommonService.getNewImgList(10, id);
      return { news, hot, imgs };
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  }


  // 单页列表页
  static async page(id, currentPage = 1, pageSize = 10) {
    try {
      const data = await CommonService.list(id, currentPage, pageSize);
      data.list = formatDay(data.list);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  }


  // tag列表页
  static async tags(path, currentPage = 1, pageSize = 10) {
    try {
      const data = await CommonService.tags(path, currentPage, pageSize);
      data.list = formatDay(data.list);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err)
    }
  }
}

module.exports = HomeService;
