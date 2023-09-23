<template>
  <div class="mr-10 ml-10 mb-20">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="100px"
      class="mt-20"
    >
      <el-form-item label="中文名称" prop="field_cname">
        <el-input v-model="params.field_cname"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="field_ename">
        <el-input v-model="params.field_ename"></el-input>
      </el-form-item>

      <el-form-item label="字段类型">
        <el-select v-model="params.field_type" placeholder="请选择">
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="字段选项">
        <el-input v-model="params.field_values"></el-input>
      </el-form-item>

      <el-form-item label="默认值">
        <el-input v-model="params.field_default"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="params.field_sort"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/field.js";
export default {
  name: "field-add",
  components: {},
  data: () => {
    return {
      params: {
        //接口入参
        model_id: "",
        field_cname: "",
        field_ename: "",
        field_type: "",
        field_values: "",
        field_default: "",
        field_sort: "0",
      },
      type: [
        {
          value: "1",
          label: "单行文本",
        },
        {
          value: "2",
          label: "多行文本 ",
        },
        {
          value: "3",
          label: "下拉菜单",
        },
        {
          value: "4",
          label: "单选",
        },
        {
          value: "5",
          label: "多选 ",
        },
        {
          value: "6",
          label: "时间和日期 ",
        },
        {
          value: "7",
          label: "数字 ",
        },
      ],
      value: "",
      paramsRules: {
        //校验规则
        field_cname: [
          { required: true, message: "字段名称", trigger: "blur" },
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
  mounted() {},
  async created() {
    const { model_name, mid, table_name } = this.$route.query;
    this.params.model_id = mid;
    this.params.table_name = table_name;
    this.model_name = model_name;
  },
  methods: {
    handleAttr(e) {
      console.log("e-->", e);
    },

    //新增
    async create() {
      try {
        let params = { ...this.params };
        let res = await create(params);
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
<style scoped></style>
