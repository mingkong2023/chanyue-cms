import{f as e,s as t,v as a,w as s,x as i,K as l}from"./element-plus.js";import{F as o,D as n,v as r,G as m}from"./@element-plus.js";import{l as d,a as c}from"./field.js";import{h as u}from"./model.js";import{_ as p}from"./index.js";import{af as h,o as f,c as g,U as y,W as _,_ as j,a1 as b,X as C,F as w}from"./@vue.js";import"./lodash-es.js";import"./async-validator.js";import"./@vueuse.js";import"./dayjs.js";import"./@ctrl.js";import"./@popperjs.js";import"./memoize-one.js";import"./escape-html.js";import"./normalize-wheel-es.js";import"./pinia.js";import"./pinia-plugin-persist.js";import"./vue-router.js";import"./axios.js";import"./js-cookie.js";/* empty css        */const S=p({name:"field-index",setup:()=>({Edit:o,Delete:n,View:r,Search:m}),data:()=>({query:{mid:""},model_name:"",table_name:"",multipleSelection:[],tableData:[],count:0,cur:1,loading:!0}),computed:{},created(){this.query=this.$route.query,this.list()},update(){},methods:{async list(){try{let e=await d(this.query.mid,this.cur);if(200===e.code){const t=e.data;this.tableData=[...t.list],this.model_name=t.model.model_name,this.table_name=t.model.table_name,this.count=t.count,this.loading=!1}}catch(e){console.log(e)}},toggleSelection(e){e?e.forEach((e=>{this.$refs.multipleTable.toggleRowSelection(e)})):this.$refs.multipleTable.clearSelection()},handleSelectionChange(e){this.multipleSelection=e},handleCurrentChange(e){this.cur=Number(e),sessionStorage.setItem("cur",Number(e)),this.list()},toEdit(e){console.log(e);const{id:t,field_ename:a}=e;this.$router.push({name:"field-edit",query:{fid:t,mid:this.query.mid,table_name:a,model_name:this.model_name}})},delSome(){},hasUse:async e=>await u(e),async handleDel(e){let{id:t}=e;try{if(0===(await this.hasUse(this.query.mid)).data.count){200===(await c(t)).code&&(this.$message({message:"删除成功 ^_^",type:"success"}),this.list())}else this.$message({message:"当前模型正在使用，字段不能删除 ^_^",type:"success"})}catch(a){console.log(a)}}}},[["render",function(o,n,r,m,d,c){const u=e,p=h("router-link"),S=t,k=a,q=s,x=i,D=l;return f(),g(w,null,[y(S,{type:"flex",class:"mt-10 mb-10",justify:"end"},{default:_((()=>[y(p,{to:{name:"field-add",query:{mid:o.query.mid,table_name:o.table_name,model_name:o.model_name}}},{default:_((()=>[y(u,{type:"primary",round:""},{default:_((()=>[j("新增")])),_:1})])),_:1},8,["to"])])),_:1}),b((f(),C(q,{ref:"multipleTable",data:o.tableData,"tooltip-effect":"dark",style:{width:"100%"},"row-key":"id",size:"small",onSelectionChange:c.handleSelectionChange},{default:_((()=>[y(k,{type:"selection",width:"55"}),y(k,{prop:"id",label:"编号"}),y(k,{prop:"field_cname",label:"中文名称"}),y(k,{prop:"field_ename",label:"字段名称"}),y(k,{prop:"field_sort",label:"排序"}),y(k,{fixed:"right",label:"操作",width:"150"},{default:_((e=>[y(u,{icon:m.Edit,circle:"",onClick:t=>c.toEdit(e.row)},null,8,["icon","onClick"]),y(u,{icon:m.Delete,circle:"",onClick:t=>c.handleDel(e.row)},null,8,["icon","onClick"])])),_:1})])),_:1},8,["data","onSelectionChange"])),[[D,o.loading]]),y(S,{type:"flex",class:"mt-20",justify:"space-between"},{default:_((()=>[y(x,{background:"",layout:"prev, pager, next",onCurrentChange:c.handleCurrentChange,"pager-size":10,total:o.count,"hide-on-single-page":""},null,8,["onCurrentChange","total"])])),_:1})],64)}]]);export{S as default};