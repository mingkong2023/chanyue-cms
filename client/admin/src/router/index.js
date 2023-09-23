import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/components/layout/index.vue";

export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "404",
    },
  },
];

// 看作是异步获取路由 通过路由拦截来动态吧这块追加进去
export const asyncRoutes = [
  {
    path: "/home",
    name: "home-info",
    component: "@/views/home/info.vue",
    meta: {
      title: "网站信息",
      icon: "DataLine",
      isShow: true,
      role: ["admin"],
    },
  },
  {
    path: "/sys",
    name: "sys",
    meta: {
      title: "系统管理",
      icon: "Setting",
      isShow: true,
      role: ["admin"],
    },
    redirect: "/system",
    children: [
      {
        path: "/system",
        name: "sys-index",
        component: "@/views/home/sys.vue",
        meta: {
          title: "系统设置",
          isShow: true,
          role: ["admin"],
        },
      },
    ],
  },

  {
    path: "/content",
    name: "content",
    meta: {
      title: "内容管理",
      isShow: true,
      icon: "Grid",
      role: ["admin"],
    },
    redirect: "/category",
    children: [
      {
        path: "/category",
        name: "category-index",
        component: "@/views/category/index.vue",
        meta: {
          title: "栏目管理",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/category/add",
        name: "category-add",
        component: "@/views/category/add.vue",
        meta: {
          title: "栏目管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/category/edit/:id",
        name: "category-edit",
        component: "@/views/category/edit.vue",
        meta: {
          title: "页面管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/article",
        name: "article-index",
        component: "@/views/article/index.vue",
        meta: {
          title: "文章管理",
          isShow: true,
          role: ["admin"],
        },
      },

      {
        path: "/article/add",
        name: "article-add",
        component: "@/views/article/add.vue",
        meta: {
          title: "文章管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/article/edit/:id",
        name: "article-edit",
        component: "@/views/article/edit.vue",
        meta: {
          title: "文章管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },

      {
        path: "/tag",
        name: "tag-index",
        component: "@/views/tag/index.vue",
        meta: {
          title: "标签管理",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/tag/add",
        name: "tag-add",
        component: "@/views/tag/add.vue",
        meta: {
          title: "标签管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/tag/edit/:id",
        name: "tag-edit",
        component: "@/views/tag/edit.vue",
        meta: {
          title: "标签管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/frag",
        name: "frag-index",
        component: "@/views/frag/index.vue",
        meta: {
          title: "碎片管理",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/frag/add",
        name: "frag-add",
        component: "@/views/frag/add.vue",
        meta: {
          title: "碎片管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/frag/edit/:id",
        name: "frag-edit",
        component: "@/views/frag/edit.vue",
        meta: {
          title: "碎片管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },
    ],
  },

  {
    path: "/gather",
    name: "gather",
    meta: {
      title: "采集功能",
      icon: "MagicStick",
      isShow: true,
      role: ["admin"],
    },
    redirect: "/collect",
    children: [
      {
        path: "/collect",
        name: "collect-index",
        component: "@/views/collect/index.vue",
        meta: {
          title: "采集配置",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/collect/add",
        name: "collect-add",
        component: "@/views/collect/add.vue",
        meta: {
          title: "采集配置-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/collect/:id",
        name: "collect-edit",
        component: "@/views/collect/edit.vue",
        meta: {
          title: "采集配置-更新",
          isShow: false,
          role: ["admin"],
        },
      },
    ],
  },

  {
    path: "/extend",
    name: "extend",
    meta: {
      title: "功能管理",
      icon: "Operation",
      isShow: true,
      role: ["admin"],
    },
    children: [
      {
        path: "/model",
        name: "model-index",
        component: "@/views/model/index.vue",
        meta: {
          title: "模型管理",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/model/add",
        name: "model-add",
        component: "@/views/model/add.vue",
        meta: {
          title: "模型管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/model/edit/:id",
        name: "model-edit",
        component: "@/views/model/edit.vue",
        meta: {
          title: "模型管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/model/field",
        name: "field-index",
        component: "@/views/field/index.vue",
        meta: {
          title: "字段管理",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/model/field/add",
        name: "field-add",
        component: "@/views/field/add.vue",
        meta: {
          title: "字段管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/model/field/edit",
        name: "field-edit",
        component: "@/views/field/edit.vue",
        meta: {
          title: "字段管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },

      {
        path: "/friendlink",
        name: "friendlink-index",
        component: "@/views/friendlink/index.vue",
        meta: {
          title: "友情链接",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/friendlink/add",
        name: "friendlink-add",
        component: "@/views/friendlink/add.vue",
        meta: {
          title: "友情链接-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/friendlink/edit/:id",
        name: "friendlink-edit",
        component: "@/views/friendlink/edit.vue",
        meta: {
          title: "友情链接-更新",
          isShow: false,
          role: ["admin"],
        },
      },

      {
        path: "/message",
        name: "message-index",
        component: "@/views/message/index.vue",
        meta: {
          title: "消息管理",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/message/add",
        name: "message-add",
        component: "@/views/message/add.vue",
        meta: {
          title: "消息管理-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/message/edit/:id",
        name: "message-edit",
        component: "@/views/message/edit.vue",
        meta: {
          title: "消息管理-更新",
          isShow: false,
          role: ["admin"],
        },
      },
    ],
  },

  {
    path: "/manage",
    name: "manage",
    meta: {
      title: "管理员",
      isShow: true,
      icon: "CreditCard",
      role: ["admin"],
    },
    redirect: "/admin",
    children: [
      {
        path: "/admin",
        name: "admin-index",
        component: "@/views/admin/index.vue",
        meta: {
          title: "管理员列表",
          isShow: true,
          role: ["admin"],
        },
      },
      {
        path: "/admin/add",
        name: "admin-add",
        component: "@/views/admin/add.vue",
        meta: {
          title: "管理员列表-新增",
          isShow: false,
          role: ["admin"],
        },
      },
      {
        path: "/admin/edit/:id",
        name: "admin-edit",
        component: "@/views/admin/edit.vue",
        meta: {
          title: "管理员列表-更新",
          isShow: false,
          role: ["admin"],
        },
      },
    ],
  },
];

//导出最终路由
export const routes = constantRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

/**
 * 路由拦截
 * 1.用户登录之后，通过pinia在存储用户角色和token
 * 2.通过路由和角色过滤出对应角色的路由，然后动态添加到路由上面
 * router.beforeEach(async (to, from, next)
 */
import { userStore } from "@/stores/user";
router.beforeEach(async (to, from) => {
  const user = userStore();
  if (user.token) {
    //已登录
    if (to.path === "/login") {
      //已登录直接进入首页
      return { path: "/" };
    } else {
      //校验token是否正确或者过期
      if (user.userInfo) {
        //刷新页面后，这个就没有了，然后动态添加路由，刷新重定向路由
        return true;
      } else {
        //然后动态添加路由，刷新重定向路由
        const role = await user.getUserInfo();
        //根据获取菜单
        await user.getMenuList();
        //根据用户角色role，和菜单生成路由
        const accessRoutes = user.getAccessRoutes(role); //添加路由
        accessRoutes.forEach((route) => {
          router.addRoute("Layout", route);
        });
        //触发重定向
        return to.fullPath;
      }
    }
  } else {
    //没登录
    if (to.path === "/login") {
      return true; //放行
    } else {
      return { path: "/login", query: { redirect: to.fullPath } };
    }
  }
});
export default router;
