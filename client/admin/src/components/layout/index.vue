<template>
  <div class="app-wrapper">
    <!-- 左侧菜单 -->
    <el-scrollbar
      class="sidebar"
      :style="{ width: isCollapse ? '65px' : '200px' }"
    >
      <Logo :isCollapse="isCollapse" />
      <SideBar :isCollapse="isCollapse" />
    </el-scrollbar>

    <!-- 右侧内容 -->
    <div class="main-container">
      <!-- 顶部 -->
      <div class="header">
        <div class="navbar row justify-between align-c">
          <div class="row align-c">
            <el-icon class="ico-collapse" @click="switchCollapse">
              <Expand v-if="isCollapse == true" />
              <Fold v-else />
            </el-icon>
            <BreadCrumb />
          </div>
          <NavBar />
        </div>

        <!-- <div class="tags-view">
          <TagView />
        </div> -->
      </div>
      <!-- 内容区域 -->
      <div class="app-main">
        <article class="container">
          <router-view v-slot="{ Component, route }">
            <!-- <transition :name="route.meta.transition"> -->
            <!-- <keep-alive :include="cachedViews"> -->
            <component :is="Component" />
            <!-- </keep-alive> -->
            <!-- </transition> -->
          </router-view>
        </article>
      </div>
    </div>
  </div>
</template>

<script name="LayOut">
import { defineComponent } from "vue";
import SideBar from "./components/sidebar/index.vue";
import NavBar from "./components/navbar/index.vue";
import TagView from "./components/tagsview/index.vue";
import BreadCrumb from "./components/breadcrumb/index.vue";
import Logo from "./components/logo/index.vue";

// 监听当前路由
export default defineComponent({
  components: {
    SideBar,
    NavBar,
    // TagView,
    BreadCrumb,
    Logo,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  watch: {
    $route(to, from) {
      this.activeIndex = to.path;
    },
  },
  created() {
    window.addEventListener("resize", this.changeCollapse);
  },
  mounted() {
    this.changeCollapse();
  },
  methods: {
    changeCollapse() {
      let w = document.documentElement.clientWidth;
      if (w <= 640) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    switchCollapse(key, keyPath) {
      console.log(key, keyPath);
      this.isCollapse = !this.isCollapse;
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
});
</script>

<style lang="less" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .sidebar {
    height: 100vh;
    border-right: 1px solid #f9f5f5;
    transition: all 0.5s;
  }

  .sidebar-container {
    height: 100%;
    background-color: var(--vt-c-white);
    width: 200px !important;
    // menu未收起时样式
    &-menu:not(.el-menu--collapse) {
      width: 200px;
    }
    .el-menu {
      border: none;
    }
  }

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .header {
      .navbar {
        background-color: var(--vt-c-white);
        border-bottom: 1px solid var(--color-border);

        .ico-collapse {
          width: 42px;
          height: 42px;
          cursor: pointer;
          font-size: 16px;
          color: #1890ff;
        }
      }

      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }

    .app-main {
      height: calc(100vh - 51px);
      padding: 10px;
      background-color: #f2f3f5;
      overflow: auto;
      .container {
        background-color: #fff;
        border-radius: 6px;
        padding: 10px;
        min-height: calc(100vh - 71px);
      }
    }
  }
}
</style>
