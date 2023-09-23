import{y as e,A as a,B as l,q as t,p as s,u as o,L as d,f as m,o as r}from"./element-plus.js";import{f as i,c as p}from"./category.js";import{_ as u,b as n,t as c}from"./index.js";import{l as h}from"./model.js";import{p as y}from"./pinyin-pro.js";import{o as g,c as V,a as f,U as _,W as b,a1 as j,_ as U,F as v,aa as P,X as S,t as C,a2 as k}from"./@vue.js";import"./lodash-es.js";import"./async-validator.js";import"./@vueuse.js";import"./dayjs.js";import"./@element-plus.js";import"./@ctrl.js";import"./@popperjs.js";import"./memoize-one.js";import"./escape-html.js";import"./normalize-wheel-es.js";import"./pinia.js";import"./pinia-plugin-persist.js";import"./vue-router.js";import"./axios.js";import"./js-cookie.js";/* empty css        */const x={class:"mr-10 ml-10"},w={class:"mr-10 ml-10 mb-20"};const L=u({name:"category-add",data:()=>({categorySelected:[],categorySelectedPath:"",categoryProps:{checkStrictly:!0},activeName:"first",activeIndex:"0",category:[],modList:[],params:{pid:0,seo_title:"",seo_keywords:"",seo_description:"",name:"",path:"",pinyin:"",mid:"0",description:"",url:"",sort:0,type:"0",target:"0",status:"0"}}),created(){this.query(),this.modelList()},methods:{createPinyin(e){this.params.pinyin=y(e,{toneType:"none"}).replace(/\s+/g,""),this.params.path=this.categorySelectedPath?this.categorySelectedPath+this.params.pinyin:"/"+this.categorySelectedPath+this.params.pinyin},changePath(e){this.params.path=this.categorySelectedPath?this.categorySelectedPath+e:"/"+this.categorySelectedPath+e},handleClick(e){this.activeIndex=e.index},async query(){try{let e=await i();if(200===e.code){let a=n(c(e.data));this.cate=e.data,this.category=[...a]}}catch(e){console.log(e)}},handleChange(e){let a=[];Object.values(e).forEach((e=>{this.cate.forEach((l=>{l.id==e&&a.push("/"+l.pinyin)}))})),this.categorySelectedPath=a.join("")+"/",this.params.path=this.categorySelectedPath+this.params.pinyin,-1!=e[0]&&(this.params.pid=e[e.length-1])},async modelList(){try{let e=await h(this.cur);200===e.code&&(this.modList=e.data.list)}catch(e){console.log(e)}},async categoryAdd(){try{let e=await p(this.params);200==e.code?(this.$message({message:"更新成功^_^",type:"success"}),this.$router.go(-1)):this.$message({message:e.msg,type:"success"})}catch(e){console.log(e)}},submit(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.categoryAdd()}))}}},[["render",function(i,p,u,n,c,h){const y=e,L=a,q=l,I=t,$=s,A=o,E=d,N=m,T=r;return g(),V(v,null,[f("div",x,[_(L,{modelValue:i.activeName,"onUpdate:modelValue":p[0]||(p[0]=e=>i.activeName=e),onTabClick:h.handleClick},{default:b((()=>[_(y,{label:"基本信息",name:"first"}),_(y,{label:"SEO设置",name:"second"})])),_:1},8,["modelValue","onTabClick"])]),f("div",w,[_(T,{ref:"params",model:i.params,"label-width":"84px"},{default:b((()=>[j(f("div",null,[_(I,{label:"上级栏目"},{default:b((()=>[_(q,{props:i.categoryProps,"show-all-levels":!1,modelValue:i.categorySelected,"onUpdate:modelValue":p[1]||(p[1]=e=>i.categorySelected=e),options:i.category,onChange:h.handleChange,placeholder:"不选择为顶级栏目"},null,8,["props","modelValue","options","onChange"])])),_:1}),_(I,{label:"栏目名称",prop:"name",rules:[{required:!0,message:"请输入栏目名称",trigger:"blur"},{min:1,max:50,message:"栏目不能超过50个字",trigger:"blur"}]},{default:b((()=>[_($,{modelValue:i.params.name,"onUpdate:modelValue":p[2]||(p[2]=e=>i.params.name=e),onChange:h.createPinyin},null,8,["modelValue","onChange"])])),_:1}),_(I,{label:"栏目标识"},{default:b((()=>[_($,{modelValue:i.params.pinyin,"onUpdate:modelValue":p[3]||(p[3]=e=>i.params.pinyin=e),onChange:h.changePath},null,8,["modelValue","onChange"])])),_:1}),_(I,{label:"栏目路径"},{default:b((()=>[_($,{modelValue:i.params.path,"onUpdate:modelValue":p[4]||(p[4]=e=>i.params.path=e),disabled:""},null,8,["modelValue"])])),_:1}),_(I,{label:"栏目类型"},{default:b((()=>[_(A,{modelValue:i.params.type,"onUpdate:modelValue":p[5]||(p[5]=e=>i.params.type=e),label:"0"},{default:b((()=>[U("栏目")])),_:1},8,["modelValue"]),_(A,{modelValue:i.params.type,"onUpdate:modelValue":p[6]||(p[6]=e=>i.params.type=e),label:"1"},{default:b((()=>[U("单页")])),_:1},8,["modelValue"])])),_:1}),_(I,{label:"扩展模型"},{default:b((()=>[_(E,{modelValue:i.params.mid,"onUpdate:modelValue":p[7]||(p[7]=e=>i.params.mid=e)},{default:b((()=>[_(A,{label:"0"},{default:b((()=>[U("基本模型")])),_:1}),(g(!0),V(v,null,P(i.modList,((e,a)=>(g(),S(A,{key:a,label:e.id},{default:b((()=>[U(C(e.model_name),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue"])])),_:1}),_(I,{label:"是否显示"},{default:b((()=>[_(A,{modelValue:i.params.status,"onUpdate:modelValue":p[8]||(p[8]=e=>i.params.status=e),label:"0"},{default:b((()=>[U("显示")])),_:1},8,["modelValue"]),_(A,{modelValue:i.params.status,"onUpdate:modelValue":p[9]||(p[9]=e=>i.params.status=e),label:"1"},{default:b((()=>[U("隐藏")])),_:1},8,["modelValue"])])),_:1}),_(I,{label:"栏目排序"},{default:b((()=>[_($,{modelValue:i.params.sort,"onUpdate:modelValue":p[10]||(p[10]=e=>i.params.sort=e)},null,8,["modelValue"])])),_:1})],512),[[k,0==i.activeIndex]]),j(f("div",null,[_(I,{label:"栏目描述"},{default:b((()=>[_($,{modelValue:i.params.description,"onUpdate:modelValue":p[11]||(p[11]=e=>i.params.description=e)},null,8,["modelValue"])])),_:1}),_(I,{label:"栏目链接"},{default:b((()=>[_($,{modelValue:i.params.url,"onUpdate:modelValue":p[12]||(p[12]=e=>i.params.url=e)},null,8,["modelValue"])])),_:1}),_(I,{label:"打开方式"},{default:b((()=>[_(A,{modelValue:i.params.target,"onUpdate:modelValue":p[13]||(p[13]=e=>i.params.target=e),label:"0"},{default:b((()=>[U("当前页面")])),_:1},8,["modelValue"]),_(A,{modelValue:i.params.target,"onUpdate:modelValue":p[14]||(p[14]=e=>i.params.target=e),label:"1"},{default:b((()=>[U("新页面")])),_:1},8,["modelValue"])])),_:1}),_(I,{label:"seo标题"},{default:b((()=>[_($,{modelValue:i.params.seo_title,"onUpdate:modelValue":p[15]||(p[15]=e=>i.params.seo_title=e)},null,8,["modelValue"])])),_:1}),_(I,{label:"seo关键词"},{default:b((()=>[_($,{modelValue:i.params.seo_keywords,"onUpdate:modelValue":p[16]||(p[16]=e=>i.params.seo_keywords=e)},null,8,["modelValue"])])),_:1}),_(I,{label:"seo描述"},{default:b((()=>[_($,{modelValue:i.params.seo_description,"onUpdate:modelValue":p[17]||(p[17]=e=>i.params.seo_description=e)},null,8,["modelValue"])])),_:1})],512),[[k,1==i.activeIndex]]),_(I,null,{default:b((()=>[_(N,{type:"primary",onClick:p[18]||(p[18]=e=>h.submit("params"))},{default:b((()=>[U("保存")])),_:1})])),_:1})])),_:1},8,["model"])])],64)}]]);export{L as default};
