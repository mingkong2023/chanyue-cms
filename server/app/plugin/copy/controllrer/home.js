'use strict';

'use strict';

class HomeController extends Controller {

  // 新闻列表页
  async index(req,res,next) {
  // 获取数据显示到新闻页面


    const arr = [
      // 小学作文
      { url: 'https://www.zww123.com/xxzw/zuowen1/', cid: 4 },
      { url: 'https://www.zww123.com/xxzw/zuowen2/', cid: 5 },
      { url: 'https://www.zww123.com/xxzw/zuowen3/', cid: 6 },
      { url: 'https://www.zww123.com/xxzw/zuowen4/', cid: 7 },
      { url: 'https://www.zww123.com/xxzw/zuowen5/', cid: 8 },
      { url: 'https://www.zww123.com/xxzw/zuowen6/', cid: 9 },
      // 初中作文
      { url: 'https://www.zww123.com/czzw/zuowen1/', cid: 10 },
      { url: 'https://www.zww123.com/czzw/zuowen2/', cid: 11 },
      { url: 'https://www.zww123.com/czzw/zuowen3/', cid: 12 },
      // 高中作文
      { url: 'https://www.zww123.com/gzzw/zuowen1/', cid: 13 },
      { url: 'https://www.zww123.com/gzzw/zuowen2/', cid: 14 },
      { url: 'https://www.zww123.com/gzzw/zuowen3/', cid: 15 },
    ];
    await this.service.copy.home.getList(arr[11].url, arr[11].cid);
    // for (let i = 0; i < arr.length; i++) {
    //   await this.service.copy.home.getList(arr[i].url, arr[i].cid);
    // }
    res.json({
      msg:'ok'
    });

  }

  // 瑞文网
  async ruiwen(req,res,next) {
   
    const arr = [
      // 小学作文
      { url: 'https://www.ruiwen.com/zuowen/yinianjizuowen/', cid: 4 },
      { url: 'https://www.ruiwen.com/zuowen/ernianjizuowen/', cid: 5 },
      { url: 'https://www.ruiwen.com/zuowen/sannianjizuowen/', cid: 6 },
      { url: 'https://www.ruiwen.com/zuowen/sinianjizuowen/', cid: 7 },
      { url: 'https://www.ruiwen.com/zuowen/wunianjizuowen/', cid: 8 },
      { url: 'https://www.ruiwen.com/zuowen/liunianjizuowen/', cid: 9 },
      { url: 'http://www.ruiwen.com/zuowen/chuyi/', cid: 10 },
      { url: 'https://www.ruiwen.com/zuowen/chuer/', cid: 11 },
      { url: 'https://www.ruiwen.com/zuowen/chusan/', cid: 12 },
      { url: 'https://www.ruiwen.com/zuowen/gaoyizuowen/', cid: 13 },
      { url: 'https://www.ruiwen.com/zuowen/gaoerzuowen/', cid: 14 },
      { url: 'https://www.ruiwen.com/zuowen/gaosanzuowen/', cid: 15 },
    ];
    await this.service.copy.home.ruiwen(arr[11].url, arr[11].cid);
    res.json({
      msg:'ok'
    });
  }

}

module.exports = HomeController;

