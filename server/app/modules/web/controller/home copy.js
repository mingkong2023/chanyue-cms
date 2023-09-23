'use strict';
const dayjs = require('dayjs');
const { template } = require('../../../config/config.js');
const HomeService = require(`../../../service/web/default/home.js`);
const { getChildrenId, treeById } = require('../../../extend/helper.js');
const ArticleService = require('../../../service/api/article.js');

class HomeController {
constructor(){
  // super()
}
  // 首页
  static async index(req, res, next) {
    try {

      // 广告
      let ad = await HomeService.ad(1, 1);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 轮播
      const _slide = await HomeService.getArticleList(3, 0, 5);
      const slide = _slide.list;
      slide.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      });

      // 顶部头条 1头条
      const _top = await HomeService.getArticleList(1, 0, 1);
      const top = _top.list;
 
      // 顶部头条 2-5
      const _topList = await HomeService.getArticleList(1, 1, 4);
      const topList = _topList.list;
      topList.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 新闻推荐
      const news_tj = await HomeService.getArticleListById(1, 2, 1);
      const news_list = await HomeService.getArticleListById(1, '', 5);
      const news = {};
      news.tj = news_tj.list[0];

      news.list = news_list.list;
      news.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 学术交流
      const xueshu = {};
      const xueshu_tj = await HomeService.getArticleListById(2, 2, 1);
      const xueshu_list = await HomeService.getArticleListById(2, '', 5);
      xueshu.tj = xueshu_tj.list[0];

      xueshu.list = xueshu_list.list;
      xueshu.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 体育气功
      const tiyu = {};
      const tiyu_tj = await HomeService.getArticleListById(3, 2, 1);
      const tiyu_list = await HomeService.getArticleListById(3, '', 5);
      tiyu.tj = tiyu_tj.list[0];
      tiyu.list = tiyu_list.list;
      tiyu.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 医学气功
      const yixue = {};
      const yixue_tj = await HomeService.getArticleListById(4, 2, 1);
      const yixue_list = await HomeService.getArticleListById(4, '', 5);
      yixue.tj = yixue_tj.list[0];
      yixue.list = yixue_list.list;
      yixue.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 养生气功
      const ys = {};
      const ys_tj = await HomeService.getArticleListById(5, 2, 1);
      const ys_list = await HomeService.getArticleListById(5, '', 5);
      ys.tj = ys_tj.list[0];
      ys.list = ys_list.list;
      ys.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功医案
      const ya = {};
      const ya_tj = await HomeService.getArticleListById(8, 2, 1);
      const ya_list = await HomeService.getArticleListById(8, '', 5);
      ya.tj = ya_tj.list[0];
      ya.list = ya_list.list;
      ya.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功与书画
      const sh = {};
      const sh_tj = await HomeService.getArticleListById(9, 2, 1);
      const sh_list = await HomeService.getArticleListById(9, '', 5);
      sh.tj = sh_tj.list[0];
      sh.list = sh_list.list;
      sh.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功人物
      const rw = {};
      const rw_tj = await HomeService.getArticleListById(10, 2, 1);
      const rw_list = await HomeService.getArticleListById(10, '', 5);
      rw.tj = rw_tj.list[0];
      rw.list = rw_list.list;
      rw.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功实践
      const sj = {};
      const sj_tj = await HomeService.getArticleListById(12, 2, 1);
      const sj_list = await HomeService.getArticleListById(12, '', 5);
      sj.tj = sj_tj.list[0];
      sj.list = sj_list.list;
      sj.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 气功纠偏
      const jp = {};
      const jp_tj = await HomeService.getArticleListById(13, 2, 1);
      const jp_list = await HomeService.getArticleListById(13, '', 5);
      jp.tj = jp_tj.list[0];
      jp.list = jp_list.list;
      jp.list.forEach(item => {
        item.createdAt = dayjs(item.createdAt).format('MM-DD');
      });

      // 热门文章
      const _hot = await HomeService.getArticlePvList();
      const hot = _hot.list;

      // 李春生文集
      const _chunsheng = await HomeService.getArticleListById(32, '', 10);
      const chunsheng = _chunsheng.list;

      // 太极
      const _taiji = await HomeService.getArticleListById(6, '', 10);
      const taiji = _taiji.list;

      // 瑜伽
      const _yj = await HomeService.getArticleListById(7, '', 10);
      const yujia = _yj.list;

      // 加入缓存？
      res.render(`web/${template}/index.html`, { slide, top, topList, ad, news, xueshu, tiyu, yixue, ys, ya, sh, rw, sj, jp, hot, chunsheng, taiji, yujia });
      
    } catch (error) {
      console.error(error)
    }
  }

  // 列表页
  static async list(req, res, next) {
    try {
      const { cate, current, cid } = req.params;
      const currentPage = current || 1;
      const pageSize = 10;

      // 当前栏目和当前栏目下所有子导航
      const navSub = getChildrenId(cate || cid, res.locals.category);
      const id = cid ? cid : navSub.cate.id;
      if (!id) {
        res.redirect('/');
        return;
      }

      // 当前位置
      const position = treeById(id, res.locals.category);

      // 广告
      let ad = await HomeService.ad(1, 3);
      const obj = {};
      ad.forEach(item => {
        obj[item.mark] = item;
      });
      ad = obj;

      // 文章列表
      const data = await HomeService.list(id, currentPage, pageSize);
      data.list.forEach(ele => {
        ele.createdAt = dayjs(ele.createdAt).format('MM-DD');
      });
      // 本类推荐
      const tj = await HomeService.getArticleListById(id, 2, 5);

      // 本类热门
      const hot = await HomeService.getArticlePvList(id, 10);

      // 本类图文
      const pic = await HomeService.getArticleImgList(id, 10);
   
      await res.render(`web/${template}/list.html`, { position, list: data, navSub, ad, tj, hot, pic });

    } catch (error) {
      console.error(error);
    }
  }

  // 详情页
  static async article(req, res, next) {
    try {
      const id = req.params.id.replace('.html', '');

      if (!id) {
        res.redirect('/');
        return;
      }

      // 文章列表
      const article = await ArticleService.detail(id);
      if (!article) {
        res.redirect('/');
        return;
      }

      // 栏目id
      const cid = article.cid || '';

      article.createdAt = dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss');
      article.updatedAt = dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss');

      // 广告
      let ad = await HomeService.ad(1, 3);
      if (ad) {
        const obj = {};
        ad.forEach(item => {
          obj[item.mark] = item;
        });
        ad = obj;
      }

      // 当前栏目和当前栏目下所有子导航
      const navSub = getChildrenId(cid, res.locals.category);

      // 当前位置
      const position = treeById(cid, res.locals.category);

      // 增加数量
      await ArticleService.count(id);

      // 上一页
      const pre = await ArticleService.pre(id, cid);

      // 下一页
      const next = await ArticleService.next(id, cid);

      // 本类推荐
      const tj = await HomeService.getArticleListById(cid, 2, 5);

      // 本类热门
      const hot = await HomeService.getArticlePvList(cid, 10);

      // 本类图文
      const pic = await HomeService.getArticleImgList(cid, 10);

      await res.render(`web/${template}/article.html`, { position, navSub, ad, article, pre, next, tj, hot, pic });

    } catch (error) {
      console.error(error);
    }
  }

  // 单页
  // static async page(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     if (!id) {
  //       res.redirect('/');
  //       return;
  //     }
  //     // 广告
  //     let ad = await HomeService.ad(1, 3);
  //     const obj = {};
  //     ad.forEach(item => {
  //       obj[item.mark] = item;
  //     });
  //     ad = obj;

  //     // 文章列表
  //     const article = await PageService.article(id);
  //     article.createdAt = dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss');
  //     article.updatedAt = dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss');

  //     // 当前栏目和当前栏目下所有子导航
  //     const navSub = getChildrenId(article.cid, res.locals.category);

  //     // 当前位置
  //     const position = treeById(article.cid, res.locals.category);

  //     // 点击数量
      

  //     await res.render(`web/default/page.html`, { article, navSub, ad, position });

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  // 搜索页
  static async search(req, res, next) {
    try {

      const page = req.params.id || 1;
      const keywords = req.params.keywords;
      const pageSize = 10;

      // 广告
      let ad = await HomeService.ad(1, 3);
      if (ad.length > 0) {
        const obj = {};
        ad.forEach(item => {
          obj[item.mark] = item;
        });
        ad = obj;
      }

      // 文章列表
      const list = await ArticleService.search(keywords, page, pageSize);
      list.list.forEach(ele => {
        ele.updatedAt = dayjs(ele.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      });

      await res.render(`web/${template}/search.html`, { keywords, list, ad });
    } catch (error) {
      console.error(error);
    }
  }

}

module.exports =  HomeController;
