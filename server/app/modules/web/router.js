const express = require('express');
const router = express.Router();
const init = require('./middleware/init.js');
const HomeController = require(`./controller/home.js`);

// 首页模板
router.get('/', init(), HomeController.index);

// 分类
router.get([
  '/list/:cid', //兼容old
  '/:cate/index.html',
  '/:cate/index:current.html',
  '/:cate1/:cate/index.html',
  '/:cate1/:cate/index:current.html',
  '/:cate2/:cate1/:cate/index.html',
  '/:cate2/:cate1/:cate/index:current.html',
  '/:cate3/:cate2/:cate1/:cate/index.html',
  '/:cate3/:cate2/:cate1/:cate/index:current.html'], init(), HomeController.list);


// 文章页
router.get([
  '/article/:id', //兼容old
  '/article/:id.html', //兼容old
  '/article-:id.html',
  '/:cate/article-:id.html',
  '/:cate1/:cate/article-:id.html',
  '/:cate2/:cate1/:cate/article-:id.html',
  '/:cate2/:cate1/:cate/article-:id.html',
  '/:cate3/:cate2/:cate1/:cate/article-:id.html',
], init(), HomeController.article);


// 单页栏目
router.get([
  '/page/:id', //兼容old
  '/page/:id.html', //兼容old
  '/page-:id.html',
  '/:cate/page.html',
  '/:cate/page-:id.html',
  '/:cate1/:cate/page-:id.html',
  '/:cate2/:cate1/:cate/page-:id.html',
  '/:cate2/:cate1/:cate/page-:id.html',
  '/:cate3/:cate2/:cate1/:cate/page-:id.html',
], init(), HomeController.page);


 // 搜索页
 router.get([
  '/search/:keywords.html',
  '/search/:keywords/:id.html'], init(), HomeController.search);

 // tag列表页
 router.get([
  '/tags/:path.html',
  '/tags/:path/:id.html'], init(), HomeController.tag);

module.exports = router;