<template>
  <div class="page">
    <div class="login">
      <h1 class="title row align-c">
        <IconLogo class="icon"></IconLogo>
        禅悦后台管理系统
      </h1>
      <div class="login-cont">
        <el-form
          class="mt-20"
          ref="loginForm"
          :model="loginForm"
          label-width="70px"
          @keyup.enter="login"
        >
          <el-form-item
            label="用户名"
            prop="username"
            :rules="[
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              {
                required: true,
                message: '请输入密码',
                trigger: 'blur',
              },
            ]"
          >
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>

          <el-form-item
            label="验证码"
            prop="captcha"
            :rules="[
              {
                required: true,
                message: '请输入验证码',
                trigger: 'blur',
              },
            ]"
          >
            <el-row :gutter="20">
              <el-col :span="15"
                ><el-input
                  v-model="loginForm.captcha"
                  placeholder="请输入验证码"
                ></el-input
              ></el-col>
              <el-col :span="4">
                <span
                  class="captcha block pointer"
                  v-html="captcha"
                  @click="getCaptcha"
                ></span
              ></el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <footer class="login-footer overflow-h">
      <p class="f-13 text-c mt-10 c-fff">
        &copy;
        <a
          href="http://www.chanyue.top"
          class="mr-5 c-fff"
          target="_blank"
          title="chanyue"
          >www.chanyue.top</a
        >
        禅悦系统 ● 位于南京 服务全国
      </p>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { userStore } from "@/stores/user";
import { login, captcha } from "@/api/index";
import { setCookie, getCookie } from "@/utils/tool.js";
import IconLogo from "@/components/icons/IconLogo.vue";
export default defineComponent({
  components: { IconLogo },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        captcha: "", // 添加验证码属性
      },
      captcha: "", // 添加验证码图片链接属性
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    async getCaptcha() {
      try {
        let v = Math.random().toString().slice(4, 8);
        let res = await captcha(v);
        this.captcha = res;
      } catch (error) {
        console.log(error);
      }
    },

    async login() {
      const users = userStore();
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 验证码验证逻辑
          console.log();
          if (
            this.loginForm.captcha.toLowerCase() !==
            getCookie("captcha").toLowerCase()
          ) {
            // eslint-disable-next-line no-undef
            ElMessage({
              message: "验证码错误",
              type: "warning",
            });
            return false;
          }
          // 登录逻辑 当需要返回用await 不需要返回值，可以用then
          const { username, password } = this.loginForm;
          users.login({ username, password }).then((res) => {
            if (res.code == 500) {
              // eslint-disable-next-line no-undef
              ElNotification({
                title: "提示",
                message: "登录失败",
                type: "error",
              });
              return false;
            }
            // eslint-disable-next-line no-undef
            ElNotification({
              title: "提示",
              message: "登录成功",
              duration: 800,
              type: "success",
            });

            setCookie("username", username);
            this.$router.push({
              path: this.$route.query.redirect || "/",
            });
          });
        } else {
          return false;
        }
      });
    },
  },
});
</script>
<style lang="less" scoped>
.page {
  background-image: linear-gradient(300deg, #778cca, #65de83);
  min-height: 100vh;
}

.icon {
  width: 42px;
  height: 42px;
  background: #f6f6f6;
  border-radius: 50%;
  padding: 4px;
  margin-right: 5px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 50px);
  .title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #fff;
    text-align: center;
    font-weight: lighter;
    font-family: "chanyue";
  }
  .login-cont {
    max-width: 500px;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    margin: 20px;
  }
}
.login-phone {
  display: flex;
}

.captcha {
  height: 32px;
  width: 100px;
  svg {
    width: 100%;
  }
}

// .login-wrap {
//   min-height: 540px;
// }

.login-footer {
  height: 50px;
}

.pointer {
  cursor: pointer;
}
.mt-20 {
  margin-top: 20px;
}
</style>
