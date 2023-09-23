<template>
  <div class="mr-10 ml-10 mb-20">
    <el-form ref="params" :model="params" label-width="84px" class="mt-20">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="列表测试" name="list">
          <el-form-item
            label="任务名称"
            prop="taskName"
            :rules="[
              {
                required: true,
                message: '请输入任务名称',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="params.taskName"
              placeholder="例：前端库-chat问答"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="列表网址"
            prop="targetUrl"
            :rules="[
              {
                required: true,
                message: '请输入匹配网址',
                trigger: 'blur',
              },
            ]"
          >
            <div class="row w-p100">
              <el-input
                class="flex-1"
                v-model="params.targetUrl"
                placeholder="/SEO/index${*}.html"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item
            label="字符集"
            prop="chartset"
            :rules="[
              {
                required: true,
                message: '请选择字符集',
                trigger: 'blur',
              },
            ]"
          >
            <el-radio-group v-model="params.chartset" class="ml-4">
              <el-radio label="1" size="large">uft-8</el-radio>
              <el-radio label="2" size="large">gb2312</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="文章列表"
            prop="listTag"
            :rules="[
              {
                required: true,
                message: '请输入文章列表标签',
                trigger: 'blur',
              },
            ]"
          >
            <div class="row w-p100">
              <el-input
                class="flex-1"
                v-model="params.listTag"
                placeholder="例：#ul"
              ></el-input>
              <el-button class="ml-5" type="primary" @click="getPages">
                测试
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="开始页面">
            <div class="row w-p100">
              <el-input class="flex-1" v-model="params.startNum"></el-input>
              <span class="ml-5 mr-5">至</span>
              <el-input class="flex-1" v-model="params.endNum"></el-input>
              <span class="ml-5 mr-5">每页递增</span>
              <el-input
                class="flex-1 mr-5"
                v-model="params.increment"
              ></el-input>
              <el-button type="primary" @click="submit('params')"
                >测试</el-button
              >
            </div>
          </el-form-item>

          <el-form-item label="目标地址" class="show">
            <p v-for="(item, index) of params.pages" :key="index">
              {{ item }}
            </p>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="内容测试" name="article">
          <el-form-item label="目标地址">
            <a class="mr-10" :href="params.pages[0]" target="_blank">{{
              params.pages[0]
            }}</a
            >（默认第一个作为测试）
          </el-form-item>

          <el-form-item
            label="文章标题"
            prop="titleTag"
            :rules="[
              {
                required: true,
                message: '请输入文章标题',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              class="flex-1"
              placeholder="例：.title"
              v-model="params.titleTag"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="文章内容"
            prop="articleTag"
            :rules="[
              {
                required: true,
                message: '请输入文章内容',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              placeholder="例：.article"
              v-model="params.articleTag"
            ></el-input>
          </el-form-item>

          <el-form-item label="清理代码" prop="removeCode">
            <el-input
              v-model="params.removeCode"
              placeholder="例：$('div').remove()"
            ></el-input>
          </el-form-item>

          <el-form-item label="清理正则" prop="clearRegCode">
            <div class="row w-p100">
              <el-input
                class="flex-1"
                v-model="params.clearRegCode"
                placeholder="填写正则"
              ></el-input>
              <el-button class="ml-5" type="primary" @click="getArticle"
                >测试</el-button
              >
            </div>
          </el-form-item>

          <el-form-item class="show" label="文章结果">
            <p>标题：{{ article.title }}</p>
            <p>内容：</p>
            <div v-html="article.article"></div>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="保存配置" name="save">
          <el-form-item
            label="保存栏目"
            prop="articleTag"
            :rules="[
              {
                required: true,
                message: '请输入保存栏目',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="params.cid" placeholder="例：cid"></el-input>
          </el-form-item>

          <el-form-item
            label="发布状态"
            prop="status"
            :rules="[
              {
                required: true,
                message: '请选择字符集',
                trigger: 'blur',
              },
            ]"
          >
            <el-radio-group v-model="params.status" class="ml-4">
              <el-radio label="1" size="large">草稿</el-radio>
              <el-radio label="2" size="large">发布</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit('params')">保存</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { create, getPages, getArticle } from "@/api/collect.js";

export default {
  name: "collect-add",
  data: () => {
    return {
      activeName: "list",
      params: {
        taskName: "",
        targetUrl: "",
        listTag: "",
        startNum: 0,
        endNum: 0,
        increment: 0,
        pages: [],
        titleTag: "",
        articleTag: "",
        chartset: "1", //utf-8
        clearRegCode: "",
        removeCode: "",
        status: "1", //是否限制
        cid: 1,
      },
      article: {},
    };
  },
  computed: {},
  mounted() {},
  async created() {},
  methods: {
    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
    },

    async getPages() {
      try {
        let { targetUrl, listTag, chartset } = this.params;
        let res = await getPages({ targetUrl, listTag, chartset });
        if (res.code == 200) {
          this.params.pages = res.data || [];
          this.$message({
            message: "列表地址获取成功^_^",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getArticle() {
      try {
        let {
          taskUrl,
          titleTag,
          articleTag,
          removeCode,
          clearRegCode,
          chartset,
        } = this.params;

        taskUrl = this.params.pages[0] || "";
        let res = await getArticle({
          taskUrl,
          titleTag,
          articleTag,
          removeCode,
          clearRegCode,
          chartset,
        });
        if (res.code == 200) {
          this.article = res.data;
          this.$message({
            message: "内功获取成功^_^",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //新增
    async create() {
      try {
        let res = await create(this.params);
        if (res.code == 200) {
          this.$message({
            message: "新增成功^_^",
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
          this.create();
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
:deep(.show .el-form-item__content) {
  flex-direction: column;
  align-items: start;
}
</style>
