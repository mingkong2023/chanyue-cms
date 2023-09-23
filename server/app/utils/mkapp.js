const config = require('../config/config');

//前置补零
var addPreZero=(num)=>{
    return (num > 9) ? num : '0' + num;
};

var mkapp = {

	time:(time)=>{
        let _date = time?time:new Date();
        let _week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        let year = _date.getFullYear();
        let month = addPreZero(_date.getMonth() + 1);
        let date = addPreZero(_date.getDate());
        let hours=addPreZero(_date.getHours());
        let minute=addPreZero(_date.getMinutes());
        let second=addPreZero(_date.getSeconds());

        return {
            year : year,
            month :month,
            date :date,
            week:_week[_date.getDay()],
            hours:hours,
            minute:minute,
            second:second,
            millisecond:_date.getMilliseconds(),
            time:_date.getTime(),
            default:year + '-' + month + '-' + date +' '+hours+':'+minute+':'+second
        }

    },
    
    MD5_SUFFIX:'[utweASDS的粉DSTERwq230撒旦法4.[p.,]l,%^&*%^%^&$撒旦法&*830453@#43453?<:Lp[-=sad',

    md5 :function(str){
       return require('crypto').createHash('md5').update(str).digest('hex');
    },

    base64ToString:str=>{
        return new Buffer(str, 'base64').toString();
    },

    stringToBase64:str=>{
        return new Buffer(str).toString('base64');
    },
    categoryTree : function(arr){
        let result = [];
        let dataTable = {};
        for (let i = 0; i < arr.length; i++) {
            let d = arr[i];
            dataTable[d.id] = d;
            if(d.pid != 0){
                var childrenOfParent = dataTable[d.pid].children;
                if(childrenOfParent && childrenOfParent.length){
                    childrenOfParent.push(d);
                }else{
                    dataTable[d.pid].children = [d];
                }
            }else{
                result.push(d);
            }
        }
        return result;
    },
    getImgUrlFromStr:function(str){
        
        let imgReg = /<img.*?(?:>|\/>)/gi;  //匹配出图片img标签
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //匹配出图片src属性
        let arr = str.match(imgReg);
        let imgArr = [];
        if(!!arr){
            for (let i = 0; i < arr.length; i++) {
                let src = arr[i].match(srcReg);
                if(src[1]){
                   imgArr.push(src[1])
                }
           }
        }
        
        return imgArr;
    },
    objForEach:function(obj, fn) {
        let key, result
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result = fn.call(obj, key, obj[key])
                if (result === false) {
                    break
                }
            }
        }
    }
};


module.exports = mkapp;

