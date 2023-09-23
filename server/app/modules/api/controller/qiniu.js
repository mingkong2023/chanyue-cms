"use strict";
const {config, helper: {success,fail}} = require('../../../common/BaseController');
const QiniuService = require("../service/qiniu.js");
const fs = require("fs");

class QiniuController  {
  

  // 获取七牛云上传token
  static async getUploadToken(req, res, next) {
    try {
      const data = await QiniuService.getUploadToken();
      res.json({ ...success, data: data });
    } catch (error) {
      next(error);
    }
  }

  // 服务端直传七牛
  static async upload(req, res, next) {
    try {
      let file = req.file;
      const { originalname, filename, path } = file;
      const { domain = ''} = config.qiniuOss;
      const uploadResult = await QiniuService.upload(file);
      const { key='' } = uploadResult.data;
      if (uploadResult.code == 200) {
        fs.unlinkSync(file.path); //删除服务本地文件
        res.json({
          ...success,
          data: {
            path: `//${domain}${key}`,
            domain,
            originalname,
            filename,
            link: key,
          },
        });
      } else {
        res.json({ ...fail, data: uploadResult.data });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QiniuController;
