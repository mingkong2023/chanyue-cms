<template>
  <div justify="end" class="navbar-cont" :gutter="20">
    <!-- 搜索 -->
    <!-- <el-button icon="Search" circle /> -->

    <el-tooltip
      class="mr-10"
      effect="dark"
      content="站点"
      placement="top-start"
    >
      <a href="/" target="_blank">
        <el-button :icon="IconLaunch" circle />
      </a>
    </el-tooltip>

    <!-- 语言 -->
    <!-- <el-tooltip
      class="mr-10"
      effect="dark"
      content="语言"
      placement="top-start"
    >
      <el-dropdown trigger="click">
        <el-button :icon="IconLanguage" circle />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>中文</el-dropdown-item>
            <el-dropdown-item>Englist</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip> -->

    <!-- <el-tooltip
      class="box-item"
      effect="dark"
      content="点击切换为亮色模式"
      placement="top-start"
    >
      <el-button :icon="IconSun" circle />
      <el-button :icon="IconMoon" circle />
    </el-tooltip> -->

    <!-- <el-tooltip
      class="box-item"
      effect="dark"
      content="消息通知"
      placement="top-start"
    >
      <el-badge is-dot class="bell">
        <el-button :icon="IconBell" circle />
      </el-badge>
    </el-tooltip> -->

    <!-- <el-tooltip
      class="box-item"
      effect="dark"
      content="全屏"
      placement="top-start"
    >
      <el-badge class="bell">
        <el-button :icon="IconFullscreen" circle />
      </el-badge>
      <template #icon>
        <IconFullscreen />
      </template>
    </el-tooltip> -->

    <el-tooltip
      class="mr-10"
      effect="dark"
      content="管理员"
      placement="top-start"
    >
      <el-dropdown trigger="click">
        <el-button icon="Avatar" circle />
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item>用户中心</el-dropdown-item> -->
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup name="NavBar">
import IconLanguage from "../../../icons/IconLanguage.vue";
import IconSun from "../../../icons/IconSun.vue";
import IconMoon from "../../../icons/IconMoon.vue";
import IconBell from "../../../icons/IconBell.vue";
import IconFullscreen from "../../../icons/IconFullscreen.vue";
import IconLaunch from "../../../icons/IconLaunch.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { userStore } from "@/stores/user";
const logout = () => {
  const user = userStore();
  user.logout();
  location.reload();
};
</script>

<style scoped>
:deep(.el-badge__content.is-fixed.is-dot) {
  top: 5px;
  right: 10px;
}
.navbar-cont {
  padding: 8px 20px;
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
