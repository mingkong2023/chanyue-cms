<template>
  <div class="mr-10 mt-30 ml-10 mb-20">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="84px"
      class
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="params.username" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="params.password"></el-input>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-date-picker
          v-model="params.updatedAt"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="是否显示">
        <el-radio v-model="params.status" label="1">启用</el-radio>
        <el-radio v-model="params.status" label="2">关闭</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, detail } from "@/api/admin.js";
import { getCookie, setCookie } from "@/utils/tool";
export default {
  name: "admin-edit",
  data: () => {
    return {
      params: {
        username: "",
        password: "",
        updatedAt: new Date(),
        status: "1",
      },
      paramsRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "2到20个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "6到20个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {},
  async created() {
    this.params.id = this.$route.params.id;
    this.username = getCookie("username");
    await this.detail();
  },
  methods: {
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let params = res.data;
          params.status = params.status.toString();
          params.updatedAt = new Date(params.createdAt);
          this.params = params;
        }
      } catch (error) {
        console.error(error);
      }
    },

    //更新
    async update() {
      try {
        let res = await update(this.params);
        if (res.code == 200) {
          if (this.params.username == this.username) {
            this.$message({
              message: "密码更新成功,请重新登录^_^",
              type: "success",
            });
            setCookie("token", "");
            this.$router.push({ name: "login-in" });
          } else {
            this.$message({
              message: "更新成功^_^",
              type: "success",
            });
            this.$router.go(-1);
          }
        }
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
