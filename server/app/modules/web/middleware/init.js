
const CommonService = require(`../service/common.js`);
const SiteService = require("../../api/service/site.js");
const FragService = require("../../api/service/frag.js");
const TagService = require("../../api/service/tag.js");
const FriendlinkService = require("../../api/service/friendlink.js");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const { helper, config: { template } } = req.app.locals;
      if ("site" in req.app.locals) {
        await next();
        return;
      }
      // 站点
      const site = await SiteService.find();
      site.json = site.json ? JSON.parse(site.json) : {};
      // 分类
      const category = await CommonService.category();
      //导航

      const nav = helper.tree(category);
      // 友情链接
      let friendlink = await FriendlinkService.list();
      friendlink = friendlink.list || [];
      //样式路径
      const base_url = `/public/template/${template}`;
      //获取碎片 默认获取100条
      const frag = await FragService.list();
      //获取tag标签 默认100条
      const tag = await TagService.list();
      req.app.locals = {
        ...req.app.locals,
        site,
        nav,
        category,
        friendlink,
        base_url,
        frag,
        tag
      };
      await next();
    } catch (error) {
      next(error)
    }
  };
};
