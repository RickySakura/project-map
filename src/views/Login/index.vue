<template>
  <div class="login-page" @keyup.enter="handleLogin">
    <LoginHeader />
    <img src="@/assets/img/login/login-bg1.png" alt="bg" class="login-bg1" />
    <img src="@/assets/img/login/login-bg2.png" alt="bg" class="login-bg2" />
    <img src="@/assets/img/login/login-bg3.png" alt="bg" class="login-bg3" />
    <div class="login-container">
      <div class="login-tab">
        <div class="login-tab-title">欢迎登录</div>

        <el-form
          ref="accountForm"
          :model="loginForm"
          :rules="accountRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入机构编码"
              name="username"
              tabindex="1"
              auto-complete="on"
              link
              clearable
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="flex-row flex-align-center">
              <el-input
                v-model="loginForm.captcha"
                link
                class="validate-input"
                placeholder="请输入验证码"
              />
              <img
                :src="captchaImg"
                alt="验证码"
                class="validate-img ml-10"
                @click="createCaptcha"
              />
            </div>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn flex-center"
            @click.prevent="handleLogin"
            >登 录
          </el-button>
          <el-button class="forget-pwd" link @click="handleForgetPwd"
            >忘记密码？
          </el-button>
        </el-form>
      </div>
    </div>

    <LoginFooter />
  </div>
</template>

<script>
import { apiHandleUserLogin, apiGetRandomImage } from '@/api/useLoginRequest';

export default {
  setup(props) {
    // 不会在模板中引入的变量，即非响应式变量，在setup中定义
    const noRefValues = {
      checkKey: '',
      remember: false,
      isSwitchOrg: false,
      expires: 7, // 登陆cookie有效期
      captchaKey: '',
      accountRules: {
        username: [
          {
            required: true,
            message: '请输入机构编码',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change'],
          },
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        ],
      },
      identityRules: {
        username: [
          {
            required: true,
            message: '请输入证件号码',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change'],
          },
        ],
        captcha: {
          required: true,
          message: '请输入验证码',
          trigger: ['blur', 'change'],
        },
      },
      redirect: undefined,
    };
    return noRefValues;
  },
  name: 'Login',
  data() {
    return {
      activeName: 'account',
      captchaImg: '',
      captchaKey: '',
      loginForm: {
        username: '',
        password: '',
        captcha: '',
      },
      identityForm: {
        username: '',
        password: '',
        captcha: '',
      },
      passwordType: 'password',
      loading: false,
      accountActivate: false, // 是否激活账号
      captchaImg: '',
    };
  },
  methods: {
    /**
     * 生成验证码
     */
    createCaptcha() {
      let key = String(Date.now());
      this.checkKey = key;
      apiGetRandomImage(key).then((res) => {
        if (res.code === 0) {
          this.captchaImg = res.result;
        }
      });
    },
    /**
     * 处理登录请求
     */
    handleLogin() {
      const form =
        this.activeName === 'account' ? 'accountForm' : 'identityForm';
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.activeName === 'account') {
            let params = { ...this.loginForm, checkKey: this.checkKey };
            apiHandleUserLogin(params)
              .then((res) => {
                if (res.code === 200 || res.success) {
                  sessionStorage.setItem('token', res.result.token);
                  // 临时更改
                  sessionStorage.setItem(
                    'username',
                    res.result.userInfo.username
                  );
                  // 路由跳转到主页
                  this.$router.push({
                    path: '/map',
                  });
                } else { 
                  this.$message.error(res.message)
                }
              })
              .catch((err) => {
                this.$message.error(err)
                console.error(
                  '❌ ~ file: index.vue:198 ~ this.$refs[form].validate ~ err',
                  err
                );
                this.loginForm.captcha = '';
                this.createCaptcha();
              })
              .finally(() => {
                this.createCaptcha();
                this.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    /**
     * 处理忘记密码
     */
    handleForgetPwd() {
      this.$alert('如您忘记密码，请联系管理员', '温馨提示', {
        confirmButtonText: '好的',
        customClass: 'forget-pwd',
      });
    },
  },
  mounted() {
    this.createCaptcha();
  },
};
</script>

<style lang="less">
/* reset element-ui css */
.login-container {
  .el-form-item {
    margin-bottom: 0.23rem;

    .el-form-item__content {
      line-height: 0.4rem;
      font-size: 0.14rem;
    }

    .el-input {
      background: #f0f3f6;
      border-radius: 4px;
    }

    .el-input__wrapper {
      border: none !important;
      background: transparent;
      padding: 0.12rem 0.15rem;
      color: #333;
      height: 0.38rem;
      caret-color: #333;

      .el-input__inner {
        font-size: 0.14rem;
      }

      &.is-focus {
        box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
      }
    }

    &.is-error .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
    }
  }

  .el-form-item__error {
    padding-top: 0.05rem;
  }
}
</style>

<style lang="less" scoped>
.login-page {
  position: relative;
  height: 100vh;
  background-color: #dfefff;

  * {
    user-select: none;
  }

  .login-bg1 {
    position: absolute;
    height: 4.55rem;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .login-bg2 {
    position: absolute;
    height: 6.33rem;
    left: 12%;
    top: 20%;
    z-index: 2;
  }

  .login-bg3 {
    position: absolute;
    height: 7.4rem;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}

.login-form {
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
}

.login-container {
  width: 3.32rem;
  height: 4.23rem;
  font-size: 0.16rem;
  padding: 0 0.37rem;
  padding-top: 0.4rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 14px 0px rgba(153, 153, 153, 0.1);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  /*偏移*/
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 9;

  &:after {
    content: '';
    width: 0;
    height: 0;
    clear: both;
    display: block;
  }

  .login-ck,
  .forget-pwd {
    margin-top: 0.1rem;
    padding: 0;
    width: 100%;
    height: 0.38rem;
    font-weight: 400;
    color: #bec2cd;
    float: right;

    &:hover,
    &:focus,
    &:active {
      color: #027aff;
    }
  }

  .login-btn {
    width: 100%;
    height: 0.38rem;
    border-radius: 4px !important;
    color: #fff;
    font-size: 0.16rem;
    font-weight: 600;
    margin-left: 0;
    background-color: #027aff;
    border-color: #027aff;

    &:hover,
    &:focus,
    &:active {
      background-color: #3876ed;
      border-color: #3876ed;
    }
  }

  .tips {
    font-size: 0.14rem;
    color: #fff;
    margin-bottom: 0.1rem;

    span {
      &:first-of-type {
        margin-right: 0.16rem;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 0.1rem;
    bottom: 0;
    font-size: 0.16rem;
    color: #999;
    cursor: pointer;
    user-select: none;

    img {
      width: 0.16rem;
    }
  }

  .validate-input {
    width: 1.6rem;
  }

  .validate-img {
    width: 0.88rem;
    height: 0.38rem;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    left: 0.05rem;
    top: 0.14rem;
  }
}

.login-tab {
  .login-tab-title {
    padding-bottom: 0.23rem;
    font-size: 0.22rem;
    text-align: center;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #3b414f;
  }
}
</style>
