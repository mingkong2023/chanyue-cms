<template>
  <div class="mr-10 ml-10 mb-20">
    <el-form ref="params" :model="params" label-width="84px" class="mt-20">
      <el-form-item
        label="留言标题"
        :rules="[
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
        ]"
        prop="name"
      >
        <el-input v-model="params.name"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="params.tel"></el-input>
      </el-form-item>

      <el-form-item label="微信">
        <el-input v-model="params.wx"></el-input>
      </el-form-item>

      <el-form-item
        label="留言内容"
        prop="content"
        :rules="[
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="params.content"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-date-picker
          v-model="params.createdAt"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/message.js";

export default {
  name: "message-add",
  data: () => {
    return {
      params: {
        name: "",
        tel: "",
        wx: "",
        content: "",
        createdAt: new Date(),
      },

      paramsRules: {
        //校验规则
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "名称长度在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
      },
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
<style></style>
