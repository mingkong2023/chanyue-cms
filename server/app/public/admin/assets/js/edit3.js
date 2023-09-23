import{y as e,A as a,B as l,q as t,p as s,u as o,L as d,a as i,g as m,f as r,o as p}from"./element-plus.js";import{f as n,a as u,u as c}from"./category.js";import{s as h}from"./article.js";import{_ as g,e as y,b as f,t as V}from"./index.js";import{l as _}from"./model.js";import{p as b}from"./pinyin-pro.js";import"./qiniu-js.js";import{af as j,o as U,c as v,a as S,U as P,W as k,a1 as C,X as w,h as x,_ as L,F as I,aa as q,t as F,a2 as $}from"./@vue.js";import"./lodash-es.js";import"./async-validator.js";import"./@vueuse.js";import"./dayjs.js";import"./@element-plus.js";import"./@ctrl.js";import"./@popperjs.js";import"./memoize-one.js";import"./escape-html.js";import"./normalize-wheel-es.js";import"./pinia.js";import"./pinia-plugin-persist.js";import"./vue-router.js";import"./axios.js";import"./js-cookie.js";/* empty css        */import"./spark-md5.js";const E={class:"mr-10 ml-10"},A={class:"mr-10 ml-10 mb-20"};const B=g({name:"category-edit",data:()=>({id:0,categorySelected:[],categorySelectedPath:"",categoryProps:{checkStrictly:!0},activeName:"first",activeIndex:"0",cate:[],category:[],modList:[],modelFlag:!1,params:{pid:0,seo_title:"",seo_keywords:"",seo_description:"",name:"",path:"",pinyin:"",mid:"0",description:"",url:"",sort:0,type:"0",target:"0",status:"0"}}),computed:{},created(){this.id=this.$route.params.id,this.modelList(),this.query(),this.findById(),this.hasArticle()},methods:{createPinyin(e){this.params.pinyin=b(e,{toneType:"none"}).replace(/\s+/g,""),this.params.path=this.categorySelectedPath?this.categorySelectedPath+this.params.pinyin:"/"+this.categorySelectedPath+this.params.pinyin},changePath(e){this.params.path=this.categorySelectedPath?this.categorySelectedPath+e:"/"+this.categorySelectedPath+e},handleClick(e){this.activeIndex=e.index},async hasArticle(){try{let e=await h(1,"",this.id);console.log("has1111111",e),200==e.code&&(this.modelFlag=e.data.count>0)}catch(e){console.log(e)}},async query(){try{let e=await n();if(200===e.code){let a=e.data;this.cate=e.data;let l=y(this.id,a);l.length>1&&(l.length=l.length-1),console.log(l),this.categorySelected=l;let t=f(V(a));this.category=[...t]}}catch(e){console.log(e)}},async modelList(){try{let e=await _(this.cur);200===e.code&&(this.modList=e.data.list.map((e=>(e.id=e.id.toString(),e))))}catch(e){console.log(e)}},async findById(){try{let e=await u(this.id);if(200===e.code){this.params=e.data;let a=[];this.cate.forEach((l=>{l.id==e.data.pid&&a.push("/"+l.pinyin)})),this.categorySelectedPath=a.join("")+"/"}}catch(e){console.error(e)}},handleChange(e){let a=[];Object.values(e).forEach((e=>{this.cate.forEach((l=>{l.id==e&&a.push("/"+l.pinyin)}))})),this.categorySelectedPath=a.join("")+"/",this.params.path=this.categorySelectedPath+this.params.pinyin,-1!=e[0]&&(this.params.pid=e[e.length-1])},async update(){try{let e=await c(this.params);e.code?(this.$message({message:"更新成功^_^",type:"success"}),this.$router.go(-1)):this.$message({message:e.msg,type:"success"})}catch(e){console.log(e)}},submit(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.update()}))}}},[["render",function(n,u,c,h,g,y){const f=e,V=a,_=l,b=t,B=s,N=o,T=d,z=j("QuestionFilled"),O=i,Q=m,W=r,X=p;return U(),v(I,null,[S("div",E,[P(V,{modelValue:n.activeName,"onUpdate:modelValue":u[0]||(u[0]=e=>n.activeName=e),onTabClick:y.handleClick},{default:k((()=>[P(f,{label:"基本信息",name:"first"}),P(f,{label:"SEO设置",name:"second"})])),_:1},8,["modelValue","onTabClick"])]),S("div",A,[P(X,{ref:"params",model:n.params,"label-width":"84px",class:"w640"},{default:k((()=>[C(S("div",null,[0!=n.params.pid?(U(),w(b,{key:0,label:"上级栏目"},{default:k((()=>[P(_,{props:n.categoryProps,"show-all-levels":!1,modelValue:n.categorySelected,"onUpdate:modelValue":u[1]||(u[1]=e=>n.categorySelected=e),options:n.category,onChange:y.handleChange,placeholder:"不选择为顶级栏目"},null,8,["props","modelValue","options","onChange"])])),_:1})):x("",!0),P(b,{label:"栏目名称",prop:"name",rules:[{required:!0,message:"请输入栏目名称",trigger:"blur"},{min:1,max:50,message:"栏目不能超过50个字",trigger:"blur"}]},{default:k((()=>[P(B,{modelValue:n.params.name,"onUpdate:modelValue":u[2]||(u[2]=e=>n.params.name=e),onChange:y.createPinyin},null,8,["modelValue","onChange"])])),_:1}),P(b,{label:"栏目标识"},{default:k((()=>[P(B,{modelValue:n.params.pinyin,"onUpdate:modelValue":u[3]||(u[3]=e=>n.params.pinyin=e),onChange:y.changePath},null,8,["modelValue","onChange"])])),_:1}),P(b,{label:"栏目路径"},{default:k((()=>[P(B,{modelValue:n.params.path,"onUpdate:modelValue":u[4]||(u[4]=e=>n.params.path=e),disabled:""},null,8,["modelValue"])])),_:1}),P(b,{label:"栏目类型"},{default:k((()=>[P(N,{modelValue:n.params.type,"onUpdate:modelValue":u[5]||(u[5]=e=>n.params.type=e),label:"0"},{default:k((()=>[L("栏目")])),_:1},8,["modelValue"]),P(N,{modelValue:n.params.type,"onUpdate:modelValue":u[6]||(u[6]=e=>n.params.type=e),label:"1"},{default:k((()=>[L("单页")])),_:1},8,["modelValue"])])),_:1}),P(b,{label:"扩展模型"},{default:k((()=>[P(T,{modelValue:n.params.mid,"onUpdate:modelValue":u[7]||(u[7]=e=>n.params.mid=e)},{default:k((()=>[P(N,{label:"0"},{default:k((()=>[L("基本模型")])),_:1}),n.modList.length>0?(U(!0),v(I,{key:0},q(n.modList,((e,a)=>(U(),w(N,{disabled:n.modelFlag,key:a,label:e.id},{default:k((()=>[L(F(e.model_name)+"模型 ",1)])),_:2},1032,["disabled","label"])))),128)):x("",!0)])),_:1},8,["modelValue"]),P(Q,{content:"如果栏目已经存在文章，则不能更换模型",effect:"light",placement:"top-start"},{default:k((()=>[P(O,{class:"ml-20 pointer"},{default:k((()=>[P(z,{class:"c-165dff"})])),_:1})])),_:1})])),_:1}),P(b,{label:"是否显示"},{default:k((()=>[P(N,{modelValue:n.params.status,"onUpdate:modelValue":u[8]||(u[8]=e=>n.params.status=e),label:"0"},{default:k((()=>[L("显示")])),_:1},8,["modelValue"]),P(N,{modelValue:n.params.status,"onUpdate:modelValue":u[9]||(u[9]=e=>n.params.status=e),label:"1"},{default:k((()=>[L("隐藏")])),_:1},8,["modelValue"])])),_:1}),P(b,{label:"栏目排序"},{default:k((()=>[P(B,{modelValue:n.params.sort,"onUpdate:modelValue":u[10]||(u[10]=e=>n.params.sort=e)},null,8,["modelValue"])])),_:1})],512),[[$,0==n.activeIndex]]),C(S("div",null,[P(b,{label:"栏目描述"},{default:k((()=>[P(B,{modelValue:n.params.description,"onUpdate:modelValue":u[11]||(u[11]=e=>n.params.description=e)},null,8,["modelValue"])])),_:1}),P(b,{label:"栏目链接"},{default:k((()=>[P(B,{modelValue:n.params.url,"onUpdate:modelValue":u[12]||(u[12]=e=>n.params.url=e)},null,8,["modelValue"])])),_:1}),P(b,{label:"打开方式"},{default:k((()=>[P(N,{modelValue:n.params.target,"onUpdate:modelValue":u[13]||(u[13]=e=>n.params.target=e),label:"0"},{default:k((()=>[L("当前页面")])),_:1},8,["modelValue"]),P(N,{modelValue:n.params.target,"onUpdate:modelValue":u[14]||(u[14]=e=>n.params.target=e),label:"1"},{default:k((()=>[L("新页面")])),_:1},8,["modelValue"])])),_:1}),P(b,{label:"seo标题"},{default:k((()=>[P(B,{modelValue:n.params.seo_title,"onUpdate:modelValue":u[15]||(u[15]=e=>n.params.seo_title=e)},null,8,["modelValue"])])),_:1}),P(b,{label:"seo关键词"},{default:k((()=>[P(B,{modelValue:n.params.seo_keywords,"onUpdate:modelValue":u[16]||(u[16]=e=>n.params.seo_keywords=e)},null,8,["modelValue"])])),_:1}),P(b,{label:"seo描述"},{default:k((()=>[P(B,{modelValue:n.params.seo_description,"onUpdate:modelValue":u[17]||(u[17]=e=>n.params.seo_description=e)},null,8,["modelValue"])])),_:1})],512),[[$,1==n.activeIndex]]),P(b,null,{default:k((()=>[P(W,{type:"primary",onClick:u[18]||(u[18]=e=>y.submit("params"))},{default:k((()=>[L("保存")])),_:1})])),_:1})])),_:1},8,["model"])])],64)}]]);export{B as default};
