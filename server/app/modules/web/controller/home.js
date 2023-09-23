
const dayjs = require("dayjs");
const HomeService = require(`../service/home.js`);
const CommonService = require("../service/common.js");
const ArticleService = require("../../api/service/article.js");
const {config:{template},helper} = require('../../../common/BaseController.js');
class HomeController {
  // 首页
  static async index(req, res, next) {
    try {
      let result = {};
      if (!("slide" in res.locals)) {
        result = await HomeService.home();
        res.locals = { ...res.locals, ...result };
      }
      res.render(`${template}/index.html`, result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 列表页
  static async list(req, res, next) {
    try {
      const { cate, current, cid } = req.params;
      const currentPage = parseInt(current) || 1;
      const pageSize = 10;
      const { category } = req.app.locals;
      // 当前栏目和当前栏目下所有子导航
      let navSub = helper.getChildrenId(cate || cid, category);
      // const navSubField = ["id", "name", "path"];
      // navSub.cate.children = filterFields(navSub.cate.children, navSubField);

      //获取栏目id
      const id = cid || navSub.cate.id || "";
      if (!id) {
        res.redirect("/404.html");
        return;
      }

      // 当前位置
      let position = helper.treeById(id, category);
      const positionField = ["id", "name", "path"];
      position = helper.filterFields(position, positionField);

      //列表页全量数据
      const data = await HomeService.list(id, currentPage, pageSize);

      //分页
      let { count } = data.data;
      let href = position.slice(-1)[0].path + "/index";
      let pageHtml = helper.pages(currentPage, count, pageSize, href);

      await res.render(`${template}/list.html`, {
        position,
        navSub,
        pageHtml,
        ...data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 详情页
  static async article(req, res, next) {
    try {
      const { id } = req.params;
      const { category} = req.app.locals; 
      if (!id) {
        res.redirect("/404.html");
        return;
      }

      // 文章列表
      const article = await ArticleService.detail(id);
      if (!article) {
        res.redirect("/404.html");
        return;
      }

      article.tags = await CommonService.fetchTagsByArticleId(id);
      let pdf = article.tags.filter((item) => item.name == "pdf");

      // 栏目id
      const cid = article.cid || "";

      article.createdAt = dayjs(article.createdAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      article.updatedAt = dayjs(article.updatedAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      // 当前栏目和当前栏目下所有子导航
      const navSub = helper.getChildrenId(cid, category);

      // 当前位置
      const position = helper.treeById(cid, category);

      // 增加数量
      await ArticleService.count(id);

      //上一页
      const pre = await ArticleService.pre(id, cid);

      //下一页
      const next = await ArticleService.next(id, cid);

      //热门 推荐 图文
      const data = await HomeService.article(cid);

      //模板配置 pdf文件必须选择pdf标签
      let config = {
        pdf: pdf.length > 0 ? `${template}/article-pdf.html` : "",
        default: `${template}/article.html`,
      };

      await res.render(config["pdf"] || config.default, {
        ...data,
        article,
        navSub,
        position,
        pre,
        next,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 单页
  static async page(req, res, next) {
    try {
      const { cate, id } = req.params;
      const { category } = req.app.locals;

      // 当前栏目和当前栏目下所有子导航
      let cid = "";
      let navSub = {};
      let article = {};
      let position = {};

      if (!id && !cate) {
        res.redirect("/404.html");
        return;
      }

      //通过拼音找到对应的栏目
      if (cate) {
        navSub = helper.getChildrenId(cate, category);
        //获取栏目id
        cid = navSub.cate.id || "";
      }

      //文章id查找栏目id
      if (id) {
        // 文章列表
         article = await ArticleService.detail(id);
        // 栏目id
        cid = article.cid || "";
      }

      //没找到栏目 去404

      if (!cid) {
        res.redirect("/404.html");
        return;
      }

      //获取单页列表
      const data = await HomeService.page(cid, 1, 20);
      if (data.list.length > 0 && !id) {
        article = await ArticleService.detail(data.list[0].id);
      }


      //没找到文章 去404
      if (Object.keys(article).length > 0) {
        article.createdAt = dayjs(article.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        article.updatedAt = dayjs(article.updatedAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        // 当前位置
        position = helper.treeById(article.cid, category);
        // 增加数量
        await ArticleService.count(article.id);
      }
      //页面模板配置
      const config = {
        chanyue: `${template}/chanyue.html`,
        default: `${template}/page.html`,
      };
      await res.render(config[cate] || config.default, {
        data: data.list,
        navSub,
        position,
        article,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 搜索页
  static async search(req, res, next) {
    try {
      const { keywords, id } = req.params;
      const page = id || 1;
      const pageSize = 10;
      // 文章列表
      const data = await ArticleService.search(keywords, page, pageSize);
      //分页
      let { count } = data;
      let href = "/search/" + keywords;
      let pageHtml = helper.pages(page, count, pageSize, href);
      data.list.forEach((ele) => {
        ele.updatedAt = dayjs(ele.updatedAt).format("YYYY-MM-DD HH:mm:ss");
      });
      await res.render(`${template}/search.html`, {
        keywords,
        data,
        pageHtml,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // tag
  static async tag(req, res, next) {
    try {
      const { path, id } = req.params;
      const page = id || 1;
      const pageSize = 10;
      // 文章列表
      const data = await HomeService.tags(path, page, pageSize);
      //分页
      let { count } = data;
      let href = "/tag/" + path;
      let pageHtml = helper.pages(page, count, pageSize, href);
      data.list.forEach((ele) => {
        ele.updatedAt = dayjs(ele.updatedAt).format("YYYY-MM-DD HH:mm:ss");
      });
      await res.render(`${template}/tag.html`, { data, path, pageHtml });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = HomeController;
