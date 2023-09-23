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
        <el-input v-model="params.model_name"></el-input>
      </el-form-item>
      <el-form-item label="新增表名" prop="table_name">
        <el-input v-model="params.table_name" :disabled="disable"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio v-model="params.status" label="1">开启</el-radio>
        <el-radio v-model="params.status" :disabled="disable" label="0"
          >禁用</el-radio
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, hasUse, detail } from "@/api/model.js";
export default {
  name: "model-edit",
  data: () => {
    return {
      params: {
        //接口入参
        id: 0,
        old_table_name: "", //未修改之前的表名称
        model_name: "",
        table_name: "",
        status: "1",
      },
      disable: false,
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
  async mounted() {},
  async created() {
    let id = this.$route.params.id;
    this.params.id = id;
    await this.detail(); // 文章详情
    await this.hasUse(id);
  },
  methods: {
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let data = res.data;
          //记老的表名，改新表名称
          this.params = { ...data, old_table_name: data.table_name };
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
    },

    handletag(e) {
      console.log("e-->", e);
    },
    handleBox(e) {
      console.log("e-->", e);
    },

    async hasUse(id) {
      try {
        let res = await hasUse(id);
        if (res.code == 200) {
          if (res.data.count) {
            this.disable = true;
          } else {
            this.disable = false;
          }
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

    //新增
    async update() {
      try {
        let res = await update(this.params);
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },

    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style></style>
