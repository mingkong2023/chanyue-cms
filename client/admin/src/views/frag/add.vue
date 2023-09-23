<template>
  <div class="mr-10 ml-10 mb-20">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="84px"
      class="mt-20"
      v-loading="loading"
    >
      <div>
        <el-form-item label="碎片名称" prop="name">
          <el-input v-model="params.name" placeholder="请输入汉字"></el-input>
        </el-form-item>

        <el-form-item label="碎片标识" prop="mark">
          <el-input v-model="params.mark" placeholder="模板使用标识"></el-input>
        </el-form-item>

        <el-form-item label="文章内容">
          <vue3-tinymce
            v-model="params.content"
            :setting="setting"
            @init="tinymce"
            script-src="/public/admin/tinymce/tinymce.min.js"
          />
        </el-form-item>

        <el-form-item label="发布时间">
          <el-date-picker
            v-model="params.createdAt"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/frag.js";
import Vue3Tinymce from "@jsdawn/vue3-tinymce";
import { tinymceSet } from "@/config/tinymce.js";
import { pinyin } from "pinyin-pro";
export default {
  name: "frag-add",
  components: {
    Vue3Tinymce,
  },
  data: () => {
    return {
      setting: tinymceSet,
      loading: true,
      params: {
        //接口入参
        name: "",
        mark: "",
        createdAt: new Date(),
        content: "禅悦",
      },
      paramsRules: {
        //校验规则
        name: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "名称长度在 2 到 50 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  async mounted() {},

  created() {},
  unmounted() {},
  watch: {
    "params.name": function (newv, oldv) {
      this.params.mark = pinyin(newv, { toneType: "none" }).replace(/\s+/g, "");
    },
  },
  methods: {
    tinymce() {
      this.loading = false;
    },

    setContent(article) {
      this.params.content = article;
    },
    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
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
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
:deep(.tiny-textarea) {
  height: 436px;
}
</style>
