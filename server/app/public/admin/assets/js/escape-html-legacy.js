System.register(["./dayjs-legacy.js"],(function(e,r){"use strict";var t;return{setters:[e=>{t=e.g}],execute:function(){
/*!
       * escape-html
       * Copyright(c) 2012-2013 TJ Holowaychuk
       * Copyright(c) 2015 Andreas Lubbe
       * Copyright(c) 2015 Tiancheng "Timothy" Gu
       * MIT Licensed
       */
var r=/["'&<>]/;e("e",t((function(e){var t,a=""+e,s=r.exec(a);if(!s)return a;var c="",n=0,u=0;for(n=s.index;n<a.length;n++){switch(a.charCodeAt(n)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}u!==n&&(c+=a.substring(u,n)),u=n+1,c+=t}return u!==n?c+a.substring(u,n):c})))}}}));
