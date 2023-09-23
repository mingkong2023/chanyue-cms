System.register(["./element-plus-legacy.js","./category-legacy.js","./article-legacy.js","./tag-legacy.js","./upload-legacy.js","./@jsdawn-legacy.js","./tinymce-legacy.js","./@element-plus-legacy.js","./index-legacy.js","./@vue-legacy.js","./lodash-es-legacy.js","./async-validator-legacy.js","./@vueuse-legacy.js","./dayjs-legacy.js","./@ctrl-legacy.js","./@popperjs-legacy.js","./memoize-one-legacy.js","./escape-html-legacy.js","./normalize-wheel-es-legacy.js","./qiniu-js-legacy.js","./spark-md5-legacy.js","./pinia-legacy.js","./pinia-plugin-persist-legacy.js","./vue-router-legacy.js","./axios-legacy.js","./js-cookie-legacy.js","./saduocss-legacy.js"],(function(e,l){"use strict";var a,t,d,s,o,u,m,r,i,n,c,p,g,f,_,h,y,V,b,v,j,w,U,x,k,C,I,S,D,q,A,N,T,E,F,P,$,z,L,O,B,M,G,H,J,K,W;return{setters:[e=>{a=e.y,t=e.A,d=e.B,s=e.q,o=e.r,u=e.p,m=e.C,r=e.D,i=e.F,n=e.t,c=e.a,p=e.G,g=e.H,f=e.I,_=e.f,h=e.J,y=e.s,V=e.u,b=e.o,v=e.K},e=>{j=e.f},e=>{w=e.f,U=e.c},e=>{x=e.s},e=>{k=e.u},e=>{C=e._},e=>{I=e.t},e=>{S=e.B},e=>{D=e._,q=e.b,A=e.t,N=e.f,T=e.c,E=e.d},e=>{F=e.af,P=e.o,$=e.c,z=e.a,L=e.U,O=e.W,B=e.a1,M=e._,G=e.X,H=e.h,J=e.F,K=e.aa,W=e.a2},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l=document.createElement("style");l.textContent=":deep(.tiny-textarea){height:436px}.cover div{width:120px;height:90px;margin:5px;cursor:pointer}.w-300{width:300px!important}\n",document.head.appendChild(l);const X={class:"mr-10 ml-10"},Q={class:"mr-10 ml-10 mb-20"},R={class:"cover row"};e("default",D({name:"article-add",components:{Vue3Tinymce:C,Plus:S},data:()=>({setting:I,loading:!0,categorySelected:[],categoryProps:{checkStrictly:!0},activeName:"first",activeIndex:"0",category:[],cateList:[],autoImg:!1,autoDes:!1,picNum:1,taglist:[],params:{cid:0,title:"",short_title:"",tag_id:"",attr:[],seo_title:"",seo_keywords:"",seo_description:"",source:"",author:"",description:"",img:"",createdAt:new Date,updatedAt:new Date,content:"禅悦",status:"0",pv:1,link:""},field:[],dialogImageUrl:"",dialogVisible:!1,disabled:!1,cur:1,keywords:"",drawer:!1,drawerList:["/public/cover/01.jpg","/public/cover/02.jpg","/public/cover/03.jpg","/public/cover/04.jpg","/public/cover/05.jpg","/public/cover/06.jpg","/public/cover/07.jpg","/public/cover/08.jpg","/public/cover/09.jpg","/public/cover/10.jpg"]}),computed:{},mounted(){},created(){this.query(),this.searchTag()},unmounted(){},methods:{handleClick(e){this.activeIndex=e.index},setContent(e){this.params.content=e},tinymce(){this.loading=!1},selectCover(e){this.params.img=e},async searchTag(e){try{let l=await x(this.cur,e);if(200===l.code){let e=[];l.data.list.forEach((l=>{e.push({label:l.name,value:l.id})})),this.taglist=e}}catch(l){console.log(l)}},async query(){try{let e=await j();if(200===e.code){let l=q(A(e.data)),a=q(e.data);this.cateList=a,this.category=[...l]}}catch(e){console.log(e)}},handleChange(e){console.log(e),-1!=e[0]?(this.params.cid=e[e.length-1],this.findField(this.params.cid)):this.field=[]},handleAttr(e){console.log("e--\x3e",e)},handleSubCid(e){console.log("e--\x3e",e)},beforeUpload(e){if(e.size/1024/1024>2)return this.$message("上传文件必须小于1M"),!1},async upload(e){let l=new FormData;l.append("file",e.file);let a=await k(l);200===a.code&&(this.params.img=a.data.path)},async findField(e){try{let l=await w(e);200===l.code&&(this.field=l.data.fields)}catch(l){console.log(l)}},async create(){try{let e={...this.params};e.attr=e.attr.toString(),e.tag_id=e.tag_id.toString(),e.content=N(e.content),e.img||(e.img=T(e.content)[0]),e.description||(e.description=E(e.content).substr(0,255));let l={};this.field.map((e=>{l[e.field_ename]=e.field_values}));let a=await U({defaultParams:e,fieldParams:l});200==a.code?(this.$message({message:"更新成功^_^",type:"success"}),this.$router.go(-1)):this.$message({message:a.msg,type:"success"})}catch(e){console.log(e)}},submit(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.create()}))}}},[["render",function(e,l,j,w,U,x){const k=a,C=t,I=d,S=s,D=o,q=u,A=m,N=r,T=i,E=n,Y=F("MostlyCloudy"),Z=c,ee=p,le=g,ae=f,te=_,de=h,se=y,oe=F("vue3-tinymce"),ue=V,me=b,re=v;return P(),$(J,null,[z("div",X,[L(C,{modelValue:e.activeName,"onUpdate:modelValue":l[0]||(l[0]=l=>e.activeName=l),onTabClick:x.handleClick},{default:O((()=>[L(k,{label:"基本信息",name:"first"}),L(k,{label:"扩展信息",name:"second"})])),_:1},8,["modelValue","onTabClick"])]),z("div",Q,[L(me,{ref:"params",model:e.params,"label-width":"90px"},{default:O((()=>[B((P(),$("div",null,[L(se,{gutter:20},{default:O((()=>[L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"文章栏目"},{default:O((()=>[L(I,{props:e.categoryProps,"show-all-levels":!1,modelValue:e.categorySelected,"onUpdate:modelValue":l[1]||(l[1]=l=>e.categorySelected=l),options:e.category,onChange:x.handleChange},null,8,["props","modelValue","options","onChange"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"文章标题",prop:"title",rules:[{required:!0,message:"请输入文章标题",trigger:"blur"},{min:1,max:50,message:"栏目不能超过50个字",trigger:"blur"}]},{default:O((()=>[L(q,{modelValue:e.params.title,"onUpdate:modelValue":l[2]||(l[2]=l=>e.params.title=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"tag标签"},{default:O((()=>[L(A,{modelValue:e.params.tag_id,"onUpdate:modelValue":l[3]||(l[3]=l=>e.params.tag_id=l),options:e.taglist,placeholder:"请选择标签",style:{width:"240px"},multiple:"",filterable:"",remote:"","remote-method":x.searchTag},null,8,["modelValue","options","remote-method"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"内容属性"},{default:O((()=>[L(T,{modelValue:e.params.attr,"onUpdate:modelValue":l[4]||(l[4]=l=>e.params.attr=l),onChange:x.handleAttr},{default:O((()=>[L(N,{label:"1"},{default:O((()=>[M("头条")])),_:1}),L(N,{label:"2"},{default:O((()=>[M("推荐")])),_:1}),L(N,{label:"3"},{default:O((()=>[M("轮播")])),_:1}),L(N,{label:"4"},{default:O((()=>[M("热门")])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"发布时间"},{default:O((()=>[L(E,{modelValue:e.params.createdAt,"onUpdate:modelValue":l[5]||(l[5]=l=>e.params.createdAt=l),"default-value":new Date,type:"datetime",placeholder:"选择日期时间"},null,8,["modelValue","default-value"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{class:"row",label:"缩略图"},{default:O((()=>[L(le,{class:"avatar-uploader","http-request":x.upload,"show-file-list":!1,"before-upload":x.beforeUpload},{default:O((()=>[L(ee,{placement:"top-start",title:"上传",width:200,trigger:"hover",content:"上传图片作为封面图，尺寸240*180，大小50k内"},{reference:O((()=>[L(Z,{class:"avatar-uploader-icon"},{default:O((()=>[L(Y)])),_:1})])),_:1})])),_:1},8,["http-request","before-upload"]),e.params.img?(P(),G(ee,{key:0,placement:"right",width:400,trigger:"hover"},{reference:O((()=>[L(ae,{class:"avatar-uploader-icon pointer ml-10",src:e.params.img},null,8,["src"])])),default:O((()=>[L(ae,{style:{width:"100%"},src:e.params.img},null,8,["src"])])),_:1})):H("",!0),L(te,{type:"primary",class:"ml-10",onClick:l[6]||(l[6]=l=>e.drawer=!0)},{default:O((()=>[M(" 默认封面图 ")])),_:1}),L(de,{modelValue:e.drawer,"onUpdate:modelValue":l[7]||(l[7]=l=>e.drawer=l),title:"默认封面图",class:"w-300","with-header":!1},{default:O((()=>[z("div",R,[(P(!0),$(J,null,K(e.drawerList,((e,l)=>(P(),G(ae,{key:l,src:e,onClick:l=>x.selectCover(e),fit:"fit"},null,8,["src","onClick"])))),128))])])),_:1},8,["modelValue"]),L(q,{class:"ml-10 flex-1",modelValue:e.params.img,"onUpdate:modelValue":l[8]||(l[8]=l=>e.params.img=l)},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),L(S,{label:"内容摘要"},{default:O((()=>[L(q,{type:"textarea",rows:2,placeholder:"请输入内容",modelValue:e.params.description,"onUpdate:modelValue":l[9]||(l[9]=l=>e.params.description=l)},null,8,["modelValue"])])),_:1}),L(S,{label:"文章内容"},{default:O((()=>[L(oe,{modelValue:e.params.content,"onUpdate:modelValue":l[10]||(l[10]=l=>e.params.content=l),setting:e.setting,onInit:x.tinymce,"script-src":"/public/admin/tinymce/tinymce.min.js"},null,8,["modelValue","setting","onInit"])])),_:1}),L(se,{gutter:20},{default:O((()=>[L(D,{sm:24,md:12,lg:8},{default:O((()=>[L(S,{label:"自动封面"},{default:O((()=>[L(N,{modelValue:e.autoImg,"onUpdate:modelValue":l[12]||(l[12]=l=>e.autoImg=l)},{default:O((()=>[M(" 文章第 "),L(q,{modelValue:e.picNum,"onUpdate:modelValue":l[11]||(l[11]=l=>e.picNum=l),class:"w-80 mr-8 ml-8",placeholder:"请输入内容"},null,8,["modelValue"]),M("张图 ")])),_:1},8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12,lg:8},{default:O((()=>[L(S,{label:"提取描述"},{default:O((()=>[L(N,{modelValue:e.autoDes,"onUpdate:modelValue":l[13]||(l[13]=l=>e.autoDes=l)},{default:O((()=>[M("提取文章描述")])),_:1},8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12,lg:8},{default:O((()=>[L(S,{label:"是否显示"},{default:O((()=>[L(ue,{modelValue:e.params.status,"onUpdate:modelValue":l[14]||(l[14]=l=>e.params.status=l),label:"0"},{default:O((()=>[M("发布")])),_:1},8,["modelValue"]),L(ue,{modelValue:e.params.status,"onUpdate:modelValue":l[15]||(l[15]=l=>e.params.status=l),label:"1"},{default:O((()=>[M("不发布")])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1})])),[[W,0==e.activeIndex],[re,e.loading]]),B(z("div",null,[L(se,{gutter:20},{default:O((()=>[L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"短标题",prop:"name"},{default:O((()=>[L(q,{modelValue:e.params.short_title,"onUpdate:modelValue":l[16]||(l[16]=l=>e.params.short_title=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"SEO标题"},{default:O((()=>[L(q,{modelValue:e.params.seo_title,"onUpdate:modelValue":l[17]||(l[17]=l=>e.params.seo_title=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"SEO关键词"},{default:O((()=>[L(q,{modelValue:e.params.seo_keywords,"onUpdate:modelValue":l[18]||(l[18]=l=>e.params.seo_keywords=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"SEO描述"},{default:O((()=>[L(q,{modelValue:e.params.seo_description,"onUpdate:modelValue":l[19]||(l[19]=l=>e.params.seo_description=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"来源"},{default:O((()=>[L(q,{modelValue:e.params.source,"onUpdate:modelValue":l[20]||(l[20]=l=>e.params.source=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"作者"},{default:O((()=>[L(q,{modelValue:e.params.author,"onUpdate:modelValue":l[21]||(l[21]=l=>e.params.author=l)},null,8,["modelValue"])])),_:1})])),_:1}),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"外链跳转"},{default:O((()=>[L(q,{modelValue:e.params.link,"onUpdate:modelValue":l[22]||(l[22]=l=>e.params.link=l),max:"120"},null,8,["modelValue"])])),_:1})])),_:1}),(P(!0),$(J,null,K(e.field,((e,l)=>(P(),G(D,{sm:24,md:12,lg:8,key:l},{default:O((()=>[L(S,{label:e.field_cname},{default:O((()=>["1"===e.field_type?(P(),G(q,{key:0,modelValue:e.field_values,"onUpdate:modelValue":l=>e.field_values=l,max:"120"},null,8,["modelValue","onUpdate:modelValue"])):"2"===e.field_type?(P(),G(q,{key:1,type:"textarea",rows:3,placeholder:"请输入内容",modelValue:e.field_values,"onUpdate:modelValue":l=>e.field_values=l},null,8,["modelValue","onUpdate:modelValue"])):(P(),G(q,{key:2,type:"textarea",rows:3,placeholder:"请输入内容",autosize:"false",modelValue:e.field_values,"onUpdate:modelValue":l=>e.field_values=l},null,8,["modelValue","onUpdate:modelValue"]))])),_:2},1032,["label"])])),_:2},1024)))),128)),L(D,{sm:24,md:12},{default:O((()=>[L(S,{label:"浏览数"},{default:O((()=>[L(q,{modelValue:e.params.pv,"onUpdate:modelValue":l[23]||(l[23]=l=>e.params.pv=l)},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})],512),[[W,1==e.activeIndex]]),L(S,null,{default:O((()=>[L(te,{type:"primary",onClick:l[24]||(l[24]=e=>x.submit("params"))},{default:O((()=>[M("保存")])),_:1})])),_:1})])),_:1},8,["model"])])],64)}]]))}}}));