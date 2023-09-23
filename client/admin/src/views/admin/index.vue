<template>
  <el-row type="flex" class="mt-10 mb-10" justify="end">
    <router-link to="/admin/add">
      <el-button type="primary" round>新增</el-button>
    </router-link>
  </el-row>

  <div class="mr-10 ml-10">
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        row-key="id"
        size="small"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="管理员"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">{{
            scope.row.status == 1 ? "启用" : "关闭"
          }}</template>
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间">
          <template #default="scope">{{ scope.row.createdAt }}</template>
        </el-table-column>
        <el-table-column fixed="right" width="100" label="操作">
          <template #default="scope">
            <el-button
              :icon="Edit"
              circle
              @click="toEdit(scope.row)"
            ></el-button>
            <el-button
              :icon="Delete"
              :disabled="username == scope.row.username"
              circle
              @click="handleDel(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" class="mt-20 align-c" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :pager-size="10"
          :total="count"
          hide-on-single-page
        ></el-pagination>
      </el-row>
      <!-- <div style="margin-top: 20px">
          批量操作：
          <el-button @click="toggleSelection()">删除</el-button>
        </div> -->
    </el-row>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { list, del } from "@/api/admin.js";
import { getCookie, setCookie } from "@/utils/tool";
export default {
  name: "admin-index",
  setup() {
    return {
      Edit,
      Delete,
      View,
      Search,
    };
  },
  data: () => {
    return {
      keywords: "",
      tableData: [],
      multipleSelection: [],
      count: 0,
      cur: 1,
      username: "",
    };
  },
  computed: {},
  created() {
    this.username = getCookie("username");
    console.log("username-->", this.username);
    this.list();
  },
  methods: {
    //查询
    async list() {
      try {
        let res = await list(this.cur);
        if (res.code === 200) {
          this.tableData = [...res.data.list];
          this.count = res.data.count;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //翻页
    handleCurrentChange(e) {
      this.cur = e;
      this.list();
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "admin-edit", params: { id: id } });
    },

    //删除
    async handleDel(e) {
      let id = e.id;
      try {
        this.$confirm("这么疯狂，要删管理员？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await del(id);
            if (res.code === 200) {
              this.$message({
                message: "删除成功 ^_^",
                type: "success",
              });
              this.list();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
