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
        <el-input v-model="params.field_ename" :disabled="disable"></el-input>
      </el-form-item>

      <el-form-item label="字段类型">
        <el-select
          v-model="params.field_type"
          :disabled="disable"
          placeholder="请选择"
        >
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
import { update, detail } from "@/api/field.js";
import { hasUse } from "@/api/model.js";
export default {
  name: "field-edit",
  data: () => {
    return {
      params: {
        //接口入参
        id: "",
        model_id: "",
        table_name: "",
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
      disable: true,
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
  async mounted() {},
  async created() {
    console.log("this.$route.query", this.$route.query);
    const { model_name, fid, mid, table_name } = this.$route.query;
    this.params.id = fid;
    this.params.model_id = mid;
    this.params.table_name = table_name;
    this.model_name = model_name;
    await this.detail(); // 文章详情
  },
  methods: {
    async hasUse(id) {
      try {
        let res = await hasUse(id);
        if (res.data.has.length > 0) {
          this.disable = true;
        } else {
          this.disable = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let data = res.data;
          //记老的表名，改新表名称
          this.params = data;
          this.hasUse(data.model_id);
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
