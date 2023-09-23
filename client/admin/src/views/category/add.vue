<template>
  <div class="mr-10 ml-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first"></el-tab-pane>
      <el-tab-pane label="SEO设置" name="second"></el-tab-pane>
    </el-tabs>
  </div>

  <div class="mr-10 ml-10 mb-20">
    <el-form ref="params" :model="params" label-width="84px">
      <div v-show="activeIndex == 0">
        <el-form-item label="上级栏目">
          <el-cascader
            :props="categoryProps"
            :show-all-levels="false"
            v-model="categorySelected"
            :options="category"
            @change="handleChange"
            placeholder="不选择为顶级栏目"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item
          label="栏目名称"
          prop="name"
          :rules="[
            {
              required: true,
              message: '请输入栏目名称',
              trigger: 'blur',
            },
            {
              min: 1,
              max: 50,
              message: '栏目不能超过50个字',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="params.name" @change="createPinyin"></el-input>
        </el-form-item>

        <el-form-item label="栏目标识">
          <el-input v-model="params.pinyin" @change="changePath"></el-input>
        </el-form-item>

        <el-form-item label="栏目路径">
          <el-input v-model="params.path" disabled></el-input>
        </el-form-item>

        <el-form-item label="栏目类型">
          <el-radio v-model="params.type" label="0">栏目</el-radio>
          <el-radio v-model="params.type" label="1">单页</el-radio>
        </el-form-item>

        <el-form-item label="扩展模型">
          <el-radio-group v-model="params.mid">
            <el-radio label="0">基本模型</el-radio>
            <el-radio
              v-for="(item, index) of modList"
              :key="index"
              :label="item.id"
              >{{ item.model_name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否显示">
          <el-radio v-model="params.status" label="0">显示</el-radio>
          <el-radio v-model="params.status" label="1">隐藏</el-radio>
        </el-form-item>

        <el-form-item label="栏目排序">
          <el-input v-model="params.sort"></el-input>
        </el-form-item>
      </div>

      <div v-show="activeIndex == 1">
        <el-form-item label="栏目描述">
          <el-input v-model="params.description"></el-input>
        </el-form-item>

        <el-form-item label="栏目链接">
          <el-input v-model="params.url"></el-input>
        </el-form-item>

        <el-form-item label="打开方式">
          <el-radio v-model="params.target" label="0">当前页面</el-radio>
          <el-radio v-model="params.target" label="1">新页面</el-radio>
        </el-form-item>

        <el-form-item label="seo标题">
          <el-input v-model="params.seo_title"></el-input>
        </el-form-item>

        <el-form-item label="seo关键词">
          <el-input v-model="params.seo_keywords"></el-input>
        </el-form-item>

        <el-form-item label="seo描述">
          <el-input v-model="params.seo_description"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { find, create } from "@/api/category.js";
import { addLabelValue, tree } from "@/utils/tool.js";
import { list } from "@/api/model.js";
import { pinyin } from "pinyin-pro";
export default {
  name: "category-add",
  data: () => {
    return {
      categorySelected: [], //-1默认选中顶级栏目
      categorySelectedPath: "",
      categoryProps: { checkStrictly: true },
      activeName: "first", //tab 默认显示第一个
      activeIndex: "0", //tab 内容默认显示第一个
      category: [], //当前所有栏目
      modList: [], //模型列表
      params: {
        //接口入参
        pid: 0,
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        name: "",
        path: "",
        pinyin: "",
        mid: "0",
        description: "",
        url: "",
        sort: 0,
        type: "0",
        target: "0",
        status: "0",
      },
    };
  },

  created() {
    this.query();
    this.modelList();
  },

  methods: {
    createPinyin(v) {
      this.params.pinyin = pinyin(v, { toneType: "none" }).replace(/\s+/g, "");
      this.params.path = this.categorySelectedPath
        ? this.categorySelectedPath + this.params.pinyin
        : "/" + this.categorySelectedPath + this.params.pinyin;
    },

    changePath(v) {
      this.params.path = this.categorySelectedPath
        ? this.categorySelectedPath + v
        : "/" + this.categorySelectedPath + v;
    },
    handleClick(tab) {
      this.activeIndex = tab.index;
    },
    //查询
    async query() {
      try {
        let res = await find();
        if (res.code === 200) {
          let data = addLabelValue(tree(res.data));
          this.cate = res.data;
          this.category = [...data];
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleChange(e) {
      //获取路径
      let path = [];
      let ids = Object.values(e);
      ids.forEach((item) => {
        this.cate.forEach((sub) => {
          if (sub.id == item) {
            path.push("/" + sub.pinyin);
          }
        });
      });

      this.categorySelectedPath = path.join("") + "/";

      this.params.path = this.categorySelectedPath + this.params.pinyin;

      if (e[0] != -1) {
        this.params.pid = e[e.length - 1];
      }
    },

    //模型列表
    async modelList() {
      try {
        let res = await list(this.cur);
        if (res.code === 200) {
          this.modList = res.data.list;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //更新基本信息
    async categoryAdd() {
      try {
        let res = await create(this.params);
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
          this.$router.go(-1);
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.categoryAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped></style>
