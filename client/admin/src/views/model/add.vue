<template>
  <div class="mr-10 ml-10 mb-20">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="100px"
      class="mt-20"
    >
      <el-form-item label="模型名称" prop="model_name">
        <el-input v-model="params.model_name" @input="change"></el-input>
      </el-form-item>
      <el-form-item label="新增表名" prop="table_name">
        <el-input v-model="params.table_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio v-model="params.status" label="1">开启</el-radio>
        <el-radio v-model="params.status" label="0">禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/model.js";
export default {
  name: "model-add",
  components: {},
  data: () => {
    return {
      params: {
        //接口入参
        model_name: "", //
        table_name: "",
        status: "1",
      },

      paramsRules: {
        //校验规则
        model_name: [
          { required: true, message: "模型名称", trigger: "blur" },
          {
            min: 2,
            max: 80,
            message: "名称长度在 2 到 80 个字符之间",
            trigger: "blur",
          },
        ],
        table_name: [
          { required: true, message: "新增表名", trigger: "blur" },
          {
            min: 2,
            max: 80,
            message: "名称长度在 2 到 80 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    //tinymce.init({});
  },
  created() {},
  methods: {
    handleAttr(e) {
      console.log("e-->", e);
    },
    change(v) {
      console.log(v);
      this.params.table_name = v;
    },
    //新增
    async create() {
      try {
        let params = { ...this.params };
        let res = await create(params);
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
          // this.$router.go(-1);
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
<style scoped></style>
