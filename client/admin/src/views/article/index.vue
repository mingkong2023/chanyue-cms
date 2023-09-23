<template>
  <!-- 搜索区域 -->
  <div class="search row justify-between align-c pt-10 pl-20 pr-20 pb-20 mb-20">
    <el-form :inline="true" :model="params" ref="form">
      <el-form-item class="mt-10" label="栏目筛选" prop="categorySelected">
        <el-cascader
          class="w-auto ml-5"
          :show-all-levels="false"
          v-model="params.categorySelected"
          :options="category"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item class="mt-10" label="标题" prop="keywords">
        <el-input
          class="mr-10 w-auto"
          placeholder="请输入文章标题"
          :suffix-icon="Search"
          v-model="params.keywords"
          clearable
          @clear="clearSearch"
        ></el-input>
      </el-form-item>
      <el-form-item class="mt-10">
        <el-button type="primary" @click="doSearch" round>搜索</el-button>
        <el-button @click="clearSearch('form')" round>清空</el-button>
      </el-form-item>
    </el-form>

    <router-link class="mt-10" to="/article/add">
      <el-button type="primary" round>新增</el-button>
    </router-link>
  </div>

  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    row-key="id"
    size="small"
    @selection-change="handleSelectionChange"
    v-loading="loading"
  >
    <el-table-column type="selection"></el-table-column>
    <el-table-column prop="id" label="编号" width="60" fixed></el-table-column>
    <el-table-column prop="title" label="标题">
      <template #default="scope">
        <a
          class="block"
          :href="`/article-${scope.row.id}.html`"
          target="_blank"
        >
          {{ scope.row.title }}
        </a>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="attr" label="属性">
        <template #default="scope">
          <p v-if="scope.row.attr.includes('1')">头条</p>
          <p v-if="scope.row.attr.includes('2')">推荐</p>
        </template>
      </el-table-column> -->
    <el-table-column prop="name" label="栏目" width="80"></el-table-column>
    <!-- <el-table-column prop="pv" label="浏览次数"></el-table-column> -->
    <el-table-column
      prop="updatedAt"
      label="更新时间"
      width="160"
    ></el-table-column>
    <el-table-column prop="status" label="状态" width="60">
      <template #default="scope">{{
        scope.row.status == 0 ? "显示" : "隐藏"
      }}</template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button
          :icon="View"
          circle
          @click="handleClick(scope.row)"
        ></el-button>
        <el-button :icon="Edit" circle @click="toEdit(scope.row)"></el-button>
        <el-button
          :icon="Delete"
          circle
          @click="handleDel(scope.row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-row type="flex" class="mt-20" justify="space-between">
    <div style="margin-top: 20px">
      批量操作：
      <el-button @click="delSome">删除</el-button>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :pager-size="10"
      :total="count"
      v-model:currentPage="cur"
      hide-on-single-page
    ></el-pagination>
  </el-row>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { search, del } from "@/api/article.js";
import { find } from "@/api/category.js";
import { addLabelValue, tree } from "@/utils/tool.js";
export default {
  name: "article-index",
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
      cid: 0,
      cur: 1,
      category: [], //当前所有栏目
      tableData: [],
      multipleSelection: [],
      count: 0,
      loading: true,
      params: {
        keywords: "",
        categorySelected: [],
      },
    };
  },
  computed: {},
  created() {
    let { cur = 1, cid = 0, keywords = "" } = this.$route.query;

    this.cur = +cur;
    this.params = {
      categorySelected: +cid,
      keywords: keywords,
    };

    this.queryCategory();
    this.search();
  },

  watch: {
    $route(to, from) {
      console.log(to);
      if (to.name == "article-index") {
        let { cur, cid, keywords } = to.query;
        this.cur = +cur;
        this.cid = +cid;
        this.params.keywords = keywords;
        this.search();
      }
    },
  },
  methods: {
    //清空搜索
    clearSearch(str) {
      if (str) {
        this.$refs.form.resetFields();
      }
      this.$router.replace({
        name: "article-index",
        query: { cur: 1, cid: 0, keywords: "" },
      });
    },

    doSearch() {
      this.$router.replace({
        name: "article-index",
        query: { cur: this.cur, cid: this.cid, keywords: this.params.keywords },
      });
      this.search();
    },

    //查询
    async search() {
      try {
        let res = await search(this.cur, this.params.keywords, this.cid);
        if (res.code === 200) {
          this.tableData = [...res.data.list];
          this.count = res.data.count;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //翻页
    handleCurrentChange(e) {
      this.loading = true;
      this.cur = +e;
      this.doSearch();
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

    //查询
    async queryCategory() {
      try {
        let res = await find();
        if (res.code === 200) {
          let dataTree = addLabelValue(tree(res.data));
          let data = addLabelValue(res.data);
          this.cateList = data;
          this.category = [...dataTree];
        }
      } catch (error) {
        console.log(error);
      }
    },

    //选择栏目
    handleChange(e) {
      this.cid = e[e.length - 1];
    },

    //跳转到编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "article-edit", params: { id: id } });
    },

    delSome() {
      let ids = this.multipleSelection.map((item) => {
        return item.id;
      });
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await del(ids.join(","));
          if (res.code === 200) {
            this.$message({
              message: "删除成功 ^_^",
              type: "success",
            });
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //删除文章
    async handleDel(e) {
      let id = e.id;
      try {
        let res = await del(id);
        if (res.code === 200) {
          this.$message({
            message: "文章删除成功 ^_^",
            type: "success",
          });
          this.search();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  onBeforeUnmount() {},
};
</script>
<style scoped>
:deep(.el-form-item) {
  margin-bottom: 0px;
}

:deep(a) {
  color: #1f1f1f;
}

:deep(a:hover) {
  color: #165dff;
}
</style>
