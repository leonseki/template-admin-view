<template>
    <div class="login-background">
      <vue-particles class="particle">
      </vue-particles>
      <div class="login-wrapper">
        <h1 style="text-align: center; margin: 10px 0">WebSite后台服务</h1>
        <div style="text-align: center">
          <!-- 密码登录 -->
          <Form ref="passwordLogin" :model="accountData" :rules="ruleValidatePassword" v-show="loginType === 'PASSWORD'">
            <form-item prop="email">
              <Input size="large" type="text" v-model="accountData.email" placeholder="邮箱">
                <Icon type="md-mail" slot="prepend"></Icon>
              </Input>
            </form-item>
            <form-item prop="password">
              <Input
                size="large"
                type="password"
                v-model="accountData.password"
                placeholder="密码">
                <Icon type="md-lock" slot="prepend"></Icon>
              </Input>
            </form-item>
            <form-item>
              <Button type="success" :loading="isLoading" long  @click="handleSubmit('passwordLogin')">登录</Button>
              <div class="footer" style="display: flex;justify-content: space-between">
                <span>忘记密码,请联系管理员</span>
                <a class="type" href="#" @click.prevent="changeLoginType('passwordLogin')">使用{{ loginType === 'PASSWORD' ? '验证码' : '密码'}}登录</a>
              </div>
            </form-item>
          </Form>
          <!-- 验证码登录 -->
          <Form ref="messageCodeLogin" :model="accountData" :rules="ruleValidateMessageCode" v-show="loginType === 'MESSAGE_CODE'">
            <form-item prop="email">
              <Input size="large" type="text" v-model="accountData.email" placeholder="邮箱">
                <Icon type="md-mail" slot="prepend"></Icon>
              </Input>
            </form-item>
            <FormItem prop="messageCode">
              <Row :gutter="5" type="flex" align="middle">
                <Col span="14">
                  <Input
                    size="large"
                    v-model="accountData.messageCode"
                    placeholder="验证码"
                    :maxlength="6">
                    <Icon type="md-text" slot="prepend"></Icon>
                  </Input>
                </Col>
                <Col span="10">
                  <Button type="primary" long @click="getCode" :disabled="btnDis">{{ btnTxt }}</Button>
                </Col>
              </Row>
            </FormItem>
            <form-item>
              <Button type="success" long  @click="handleSubmit('messageCodeLogin')">登录</Button>
              <div class="footer" style="display: flex;justify-content: space-between">
                <span>忘记密码,请联系管理员</span>
                <a class="type" href="#" @click.prevent="changeLoginType('messageCodeLogin')">使用{{ loginType === 'PASSWORD' ? '验证码' : '密码'}}登录</a>
              </div>
            </form-item>
          </Form>
        </div>
      </div>
    </div>
</template>
<script>
  import loginApi from '../api/loginApi';
  // 验证码倒计时
  const LAST_TIME = 60;
  export default {
    data () {
      return {
        btnDis: false,
        loginType: 'PASSWORD',
        isLoading: false,
        btnTxt: '获取验证码',
        lastTime: LAST_TIME,
        accountData: {
          email: '',
          password: '',
          messageCode: ''
        },
        ruleValidatePassword: {
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请填写正确的邮箱格式', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        ruleValidateMessageCode: {
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '请填写正确的邮箱格式', trigger: 'blur'}
          ],
          messageCode: [
            {required: true, message: '请填写验证码', trigger: 'blur'},
          ]
        },
        checked: false
      }
    },
    created () {
    },
    methods: {
      handleSubmit (name) {
        const self = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            self.isLoading = true;
            if (self.loginType === 'PASSWORD') {
              const { email, password } = self.accountData;
              loginApi.login({email, password}).then(res => {
                console.log(res);
                if (res.errorCode === 0) {
                  self.$cookie.set('is_login', 1)
                  self.$router.replace('/');
                  self.$Message.success('登录成功')
                }
              });
              self.isLoading = false;
            } else if (self.loginType === 'MESSAGE_CODE') {
              const { email, messageCode } = self.accountData;
              loginApi.verificationLogin({email, code: messageCode}).then(res => {
                if (res.errorCode === 0) {
                  self.$cookie.set('is_login', 1);
                  self.$router.replace('/');
                  self.$Message.success('登录成功')
                }
              });
              self.isLoading = false
            }
          } else {
            self.$Message.error('请输入正确的登录信息')
          }
        })
      },
      changeLoginType(name) {
        this.loginType = this.loginType === 'PASSWORD' ? 'MESSAGE_CODE' : 'PASSWORD'
        this.$refs[name].resetFields()
      },
      getCode() {
        this.cutDown();
      },
      // 按钮倒计时
      cutDown() {
        this.btnDis = true;
        const { email } = this.accountData;
        loginApi.getMessageCode({email}).then(res => {
          if (res.data.errorCode === 0) {
            this.$Message.success(res.data.message);
          }
        });
        this.timer = setInterval(() => {
          if (this.lastTime > 0) {
            this.lastTime--;
            this.btnTxt = `${this.lastTime}s`
          } else {
            this.btnDis = false;
            this.btnTxt = '获取验证码';
            this.lastTime = LAST_TIME;
            clearInterval(this.timer);
          }
        }, 1000)
      }
    }
  }
</script>
<style scoped>
  .particle {
    position: absolute;
    height: 100%;
    width: 100%
  }
  .login-wrapper {
    margin: 150px auto;
    min-width: 300px;
    max-width: 350px;
  }
  .login-background {
    background-color: #fffffb;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .footer {
    font-size: 10px;
    margin-top: 5px;
  }
  .footer span {
    color: #676c77;
  }
  .footer a {
    font-weight: bold;
    text-decoration: underline;
  }
</style>

