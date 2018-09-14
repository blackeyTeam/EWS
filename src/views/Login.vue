<template>
  <el-row class="container">
    <el-form :model="ruleForm2" :rules="rules1" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <!-- <h3 class="title">登录</h3> -->
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete='off' :placeholder="$t('用户名')"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" minlength='6' :placeholder="$t('请输入')+$t('密码')"></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="transform: translate(66%, 0px);" @click.native.prevent="handleSubmit2">{{$t('Login')}}</el-button>
        <!-- <el-button @click.native.prevent="handleReset2">重置</el-button> -->
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
 import api from '../api/index';
 const{
    reqInfo,
    Http
  } = api;
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        checked: true
      };
    },
    computed: {
      rules1() {
        return {
          account: [{
              required: true,
              message: this.$t('请输入') + this.$t('用户名'),
              trigger: 'change'
            },
            //{ validator: validaePass }
          ],
          checkPass: [{
              required: true,
              message: this.$t('请输入') + this.$t('密码'),
              trigger: 'change'
            },
            //{ validator: validaePass2 }
          ]
        }
      }
    },
    methods: {
      enterToLogin() {
        document.onkeydown = e => {
          e.keyCode === 13 && this.handleSubmit2()
        }
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = {
              name: this.ruleForm2.account,
              password: this.ruleForm2.checkPass
            };
  
            // requestLogin(loginParams).then(data => {
            reqInfo.requestLogin.params = loginParams;
            reqInfo.requestLogin.headers = {
              'Content-Type': 'multipart/form-data'
            }
            reqInfo.requestLogin.cab = 1;
            Http(reqInfo.requestLogin).then(data => {
              this.logining = false;
              //NProgress.done();            
              if (data.data) {
                let {
                  msg,
                  code,
                  user
                } = data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({
                  path: '/systemUpate'
                });
              } else {
                document.onkeydown = null;
                this.$alert( this.$t(data.message),{
                  confirmButtonText: this.$t('确定'),
                  type: 'warning',
                  showClose: false,
                  callback: action => {
                    _this.enterToLogin();
                  }
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
      this.enterToLogin();
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    // .remember {
    // margin: 0px 0px 35px 0px;
    // }
    // .el-input{
    //   width:210px!important;
    // } 
  }
</style>