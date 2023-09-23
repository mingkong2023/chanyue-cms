'use strict';

// 解决 gb2312格式中文乱码 import fetch from 'node-fetch';

const cheerio = require('cheerio');
const iconv = require('iconv-lite');


class HomeService extends Service {
  async getList(api, cid) {
    try {
      const { ctx, app } = this;
      const response = await this.ctx.curl(api);

      const $ = cheerio.load(response.data.toString(), { decodeEntities: false });
      const urls = [];
      $('.left-item li').each(function(index, item) {
        const title = $(item).find('.la .ico-11');
        urls.push(title.attr('href'));
      });
      urls.forEach(async item => {
        const res = await ctx.curl(`https://www.zww123.com/${item}`);

        const $ = cheerio.load(res.data.toString(), { decodeEntities: false });
        const title = $('._title').text();
        const author = $('.info').find('span').eq(0)
          .text()
          .split('：')[1];
        const content = $('#zoomtext').removeAttr('style').removeAttr('class')
          .html()
          .replace('<div class=\"ad-300\"><script src=\"/d/js/2020/zww6.js\"></script></div>', '')
          .replace('\n\t \t \n\t \t \n\t 　　', '<p>')
          .replaceAll('\t ', '</p>')
          .replaceAll('　　', '')
          .replaceAll('<p><br></p>', '')
          .replaceAll('&nbsp;', '')
          .replaceAll(/\<br\>\d{3}/g, '');
        const addStr = `INSERT INTO article(cid,title,author,description,content,createdAt,updatedAt) values (${cid},'${title}','${author}','${content.slice(0, 200)}','${content}','2022-10-25 16:09:01','2022-10-25 16:09:01')`;
        await app.mysql.query(addStr);
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async ruiwen(api, cid) {
    try {
      const { ctx, app } = this;
      const response = await this.ctx.curl(api);

      const data = iconv.decode(response.data, 'gb2312');
      const $ = cheerio.load(data.toString(), { decodeEntities: false });

      const urls = [];
      $('.list_news li').each(function(index, item) {
        const title = $(item).find('a');
        urls.push(title.attr('href'));
      });
      $('.list_pic li').each(function(index, item) {
        const title = $(item).find('a');
        urls.push(title.attr('href'));
      });


      urls.forEach(async item => {
        const res = await ctx.curl(`${item}`);
        const data = iconv.decode(res.data, 'gb2312');
        const $ = cheerio.load(data.toString(), { decodeEntities: false });
        const title = $('h1').text();
        const author = '';
        $('.content .excellent_articles_box').remove();
        $('.content .download_card').remove();
        $('.content .download_fixed').remove();
        $('.content .rel_art_line').remove();
        $('.content div').remove();
        $('.content script').remove();
        $('.content img').remove();
        $('.content .rel_art_line').remove();
        $('.content a').remove();
        $('.content span').remove();
        $('.content p').eq(0).remove();
        $('.content p').eq(0).remove();
        $('.content').find('p').last()
          .remove();
        $('.content p').removeAttr('style').removeAttr('class');
        const description = $('.content p').eq(1).text()
          .substring(0, 30);

        const content = $('.content').html().replaceAll('<p></p>', '')
          .replaceAll('\n', '')
          .replaceAll('\t', '')
          .replaceAll('　　', '')
          .replaceAll('                                        ', '');

        const addStr = 'INSERT INTO article(cid,title,author,description,content,createdAt,updatedAt) values (?,?,?,?,?,\'2022-10-26 19:41:01\',\'2022-10-26 19:41:01\')';
        await app.mysql.query(addStr, [ cid, title, author, description, content ]);
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}


module.exports = HomeService;
