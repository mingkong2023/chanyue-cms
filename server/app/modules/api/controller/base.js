'use strict';
class BaseController {
  constructor(){
  }

 static success(res) {
    res.json({
      code: 200,
      msg: '成功',
      data: res,
    })
  }

  static fail(res,err) {
	  console.error(err);
    res.json({
      code: 500,
      msg:err
    })
  }
}

module.exports = BaseController;
