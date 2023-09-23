<template>
  <div class="mr-10 ml-10">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first"></el-tab-pane>
      <el-tab-pane label="扩展信息" name="second"></el-tab-pane>
    </el-tabs>
  </div>

  <div class="mr-10 ml-10 mb-20">
    <el-form
      ref="params"
      :model="params"
      label-width="90px"
      v-loading="loading"
    >
      <div v-show="activeIndex == 0">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <el-form-item label="文章栏目">
              <el-cascader
                :props="categoryProps"
                :show-all-levels="false"
                v-model="categorySelected"
                :options="category"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item
              label="文章标题"
              prop="title"
              :rules="[
                {
                  required: true,
                  message: '请输入文章标题',
                  trigger: 'blur',
                },
                {
                  min: 1,
                  max: 50,
                  message: '栏目不能超过50个字',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="params.title"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="tag标签">
              <el-select-v2
                v-model="params.tag_id"
                :options="taglist"
                placeholder="请选择标签"
                style="width: 240px"
                multiple
                filterable
                remote
                :remote-method="searchTag"
              />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="内容属性">
              <el-checkbox-group v-model="params.attr" @change="handleAttr">
                <el-checkbox label="1">头条</el-checkbox>
                <el-checkbox label="2">推荐</el-checkbox>
                <el-checkbox label="3">轮播</el-checkbox>
                <el-checkbox label="4">热门</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="params.updatedAt"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item class="row" label="缩略图">
              <el-upload
                class="avatar-uploader"
                :http-request="upload"
                :show-file-list="false"
                :before-upload="beforeUpload"
              >
                <el-popover
                  placement="top-start"
                  title="上传"
                  :width="200"
                  trigger="hover"
                  content="上传图片作为封面图，尺寸240*180，大小50k内"
                >
                  <template #reference>
                    <el-icon class="avatar-uploader-icon">
                      <MostlyCloudy />
                    </el-icon>
                  </template>
                </el-popover>
              </el-upload>

              <el-popover
                v-if="params.img"
                placement="right"
                :width="400"
                trigger="hover"
              >
                <template #reference>
                  <el-image
                    class="avatar-uploader-icon pointer ml-10"
                    :src="params.img"
                  />
                </template>
                <el-image style="width: 100%" :src="params.img" />
              </el-popover>

              <el-button type="primary" class="ml-10" @click="drawer = true">
                默认封面图
              </el-button>

              <el-drawer
                v-model="drawer"
                title="默认封面图"
                class="w-300"
                :with-header="false"
              >
                <div class="cover row">
                  <el-image
                    v-for="(item, index) of drawerList"
                    :key="index"
                    :src="item"
                    @click="selectCover(item)"
                    fit="fill"
                  />
                </div>
              </el-drawer>

              <el-input class="ml-10 flex-1" v-model="params.img"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="内容摘要">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="params.description"
          ></el-input>
        </el-form-item>

        <el-form-item label="文章内容">
          <vue3-tinymce
            v-model="params.content"
            :setting="setting"
            @init="tinymce"
            script-src="/public/admin/tinymce/tinymce.min.js"
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :lg="8">
            <el-form-item label="自动封面">
              <el-checkbox v-model="autoImg">
                文章第
                <el-input
                  v-model="picNum"
                  class="w-80 mr-8 ml-8"
                  placeholder="请输入内容"
                ></el-input
                >张图
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8">
            <el-form-item label="提取描述">
              <el-checkbox v-model="autoDes">提取文章描述</el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"
            ><el-form-item label="是否显示">
              <el-radio v-model="params.status" label="0">发布</el-radio>
              <el-radio v-model="params.status" label="1">不发布</el-radio>
            </el-form-item></el-col
          >
        </el-row>
      </div>

      <div v-show="activeIndex == 1">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <el-form-item label="短标题" prop="name">
              <el-input v-model="params.short_title"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="SEO标题">
              <el-input v-model="params.seo_title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="SEO关键词">
              <el-input v-model="params.seo_keywords"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="SEO描述">
              <el-input v-model="params.seo_description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="来源">
              <el-input v-model="params.source"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="作者">
              <el-input v-model="params.author"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="外链跳转">
              <el-input v-model="params.link" max="120"></el-input>
            </el-form-item>
          </el-col>
          <!--
          field_cname   中文名称 varchar 60
          field_ename   英文名称 varchar 60
          field_type
          from表单类型 1单行文本（varchar）
          2.多行文本
          text 3.下拉菜单
          text 4.单选
          text 5.多选
          6.时间和日期
          field_default  默认值可选 255
          field_values   字段配置 男 女
          field_sort     字段顺序
          -->
          <el-col
            :sm="24"
            :md="12"
            :lg="8"
            v-for="(item, index) of field"
            :key="index"
          >
            <el-form-item :label="item.field_cname">
              <el-input
                v-model="item.field_values"
                max="120"
                v-if="item.field_type === '1'"
              ></el-input>
              <el-input
                type="textarea"
                :rows="3"
                v-else-if="item.field_type === '2'"
                placeholder="请输入内容"
                v-model="item.field_values"
              ></el-input>
              <el-input
                type="textarea"
                :rows="3"
                v-else
                placeholder="请输入内容"
                autosize="false"
                v-model="item.field_values"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="12">
            <el-form-item label="浏览数">
              <el-input v-model="params.pv"></el-input> </el-form-item
          ></el-col>
        </el-row>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { find } from "@/api/category.js";
import { update, detail, findField } from "@/api/article.js";
import { search } from "@/api/tag.js";
import { upload } from "@/api/upload.js";
import Vue3Tinymce from "@jsdawn/vue3-tinymce";
import { tinymceSet } from "@/config/tinymce.js";

import {
  getImgUrlFromStr,
  filterHtml,
  filterAndReplaceImgSrc,
  filterBody,
  addLabelValue,
  treeById,
  tree,
} from "@/utils/tool.js";

export default {
  name: "article-edit",
  components: {
    Vue3Tinymce,
  },
  data: () => {
    return {
      setting: tinymceSet,
      loading: true,
      categorySelected: [], //-1默认选中顶级栏目
      categoryProps: { checkStrictly: true },

      activeName: "first", //tab 默认显示第一个
      activeIndex: "0", //tab 内容默认显示第一个
      category: [], //当前所有栏目
      cateList: [], //所有栏目
      autoImg: false,
      autoDes: false,
      picNum: 1,
      taglist: [],
      params: {
        //接口入参
        id: 0,
        cid: 0,
        sub_cid: [],
        title: "",
        short_title: "",
        tag_id: "",
        attr: [],
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        source: "",
        author: "",
        description: "",
        img: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        content: "",
        status: "0",
        pv: 1,
        link: "",
      },
      field: [], //字段列表
      fieldParams: {},
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      paramsRules: {
        //校验规则
        title: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "名称长度在 2 到 50 个字符之间",
            trigger: "blur",
          },
        ],
      },
      cur: 1,
      keywords: "",
      drawer: false,
      drawerList: [
        "/public/cover/01.jpg",
        "/public/cover/02.jpg",
        "/public/cover/03.jpg",
        "/public/cover/04.jpg",
        "/public/cover/05.jpg",
        "/public/cover/06.jpg",
        "/public/cover/07.jpg",
        "/public/cover/08.jpg",
        "/public/cover/09.jpg",
        "/public/cover/10.jpg",
      ],
    };
  },
  computed: {},
  async mounted() {},
  async created() {
    this.params.id = this.$route.params.id;
    await this.detail(); // 文章详情
    await this.query(); //查询栏目
    this.searchTag();
  },
  unmounted() {},
  methods: {
    tinymce() {
      this.loading = false;
    },
    handleClick(tab) {
      this.activeIndex = tab.index;
    },
    setContent(article) {
      this.params.content = article;
    },

    selectCover(v) {
      this.params.img = v;
    },

    //查询标签
    async searchTag(keywords) {
      try {
        let res = await search(this.cur, keywords, 100);
        if (res.code === 200) {
          let arr = [];
          res.data.list.forEach((item) => {
            arr.push({
              label: item.name,
              value: item.id,
            });
          });

          this.taglist = arr;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //查询栏目
    async query() {
      try {
        let res = await find();
        if (res.code === 200) {
          let data = res.data;
          let ids = treeById(this.params.cid, data);
          this.categorySelected = ids;
          // this.findField(this.categorySelected);
          this.findField(this.params.cid);
          let end = addLabelValue(tree(data));
          this.cateList = addLabelValue(data);
          this.category = [...end];
        }
      } catch (error) {
        console.log(error);
      }
    },

    //选择栏目
    handleChange(e) {
      if (e[0] != -1) {
        this.params.cid = e[e.length - 1];
        this.findField(this.params.cid);
      } else {
        this.field = [];
      }
    },
    //查询
    async findField(cid) {
      try {
        let res = await findField(cid);
        if (res.code === 200) {
          this.field = res.data.fields;
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
          let params = res.data;
          params.attr = params.attr ? params.attr.split(",") : [];
          params.sub_cid = params.sub_cid
            ? params.sub_cid.split(",").map((i) => Number(i))
            : [];
          params.tag_id = params.tag_id
            ? params.tag_id.split(",").map((i) => Number(i))
            : [];
          params.status = params.status.toString();
          params.updatedAt = new Date(params.createdAt);
          this.params = params;
          this.fieldParams = params.field;
          this.loading = false;
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

    beforeUpload(rawFile) {
      if (rawFile.size / 1024 / 1024 > 2) {
        this.$message("上传文件必须小于1M");
        return false;
      }
    },
    //上传缩略图
    async upload(file) {
      let fd = new FormData();
      //把上传文件的添加到 ForDate对象中
      fd.append("file", file.file);
      let res = await upload(fd);
      if (res.code === 200) {
        this.params.img = res.data.path;
      }
    },

    //新增
    async update() {
      try {
        let params = { ...this.params };
        params.attr = params.attr.toString();
        params.sub_cid = params.sub_cid.toString();
        params.tag_id = params.tag_id.toString();

        //判断是否有缩略图

        params.content = filterAndReplaceImgSrc(params.content);

        if (!params.img) {
          params.img = getImgUrlFromStr(params.content)[0];
        }

        if (!params.description) {
          params.description = filterHtml(params.content).substr(0, 255);
        }

        let res = await update({ ...params, field: this.fieldParams });
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
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
<style lang="less">
:deep(.tiny-textarea) {
  height: 436px;
}

.cover {
  div {
    width: 120px;
    height: 90px;
    margin: 5px;
    cursor: pointer;
  }
}

.w-300 {
  width: 300px !important;
}
</style>
