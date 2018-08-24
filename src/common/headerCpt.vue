<template>
  <el-row class="header-container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img src="../assets/mijialogo.png" alt="">
        <title><span>{{collapsed?'':$t(headTitle)}}</span>{{$t('Embeded Web Server')}}</title>
      </el-col>
      <el-col :span="4" class="toggleLang">
        <!-- <el-form ref="form" label-width="80px" >
  			   <el-form-item :label="delivery==true?'简体中文':'English'">
  					<el-switch v-model="delivery" @change='changeLan'></el-switch>
  				</el-form-item>
  				</el-form> -->
        <el-select v-model="value" placeholder="请选择" size="mini" @change='changeLan'>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  // import { requestLogin } from '../api/api';
  import {
    reqInfo,
    Http
  } from "../api/api";
  
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        headTitle: "headTitle",
        collapsed: false,
        delivery: false,
        langNow: '',
        value:'中文',
        options: [{
          value: '中文',
          label: '中文'
        }, {
          value: 'English',
          label: 'English'
        }, ],
      };
    },
    methods: {
      changeLan() {
        console.log(this._i18n.locale)
        this._i18n.locale = this.value == 'English' ? 'EN' : 'CN';
        document.title=this.$t('headTitle')
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header-container {
    width: 100%;
    overflow-x: hidden;
    z-index: 200;
    .header {
      padding-top: 20px;
      height: 150px;
      line-height: 45px;
      background: -webkit-linear-gradient( left, #0081A8, #23BDDB);
      /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient( right, #0081A8, #23BDDB);
      /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient( right, #0081A8, #23BDDB);
      /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #0081A8, #23BDDB);
      /* 标准的语法 */
      color: #fff;
      border-bottom: 1px solid #bcbcbc;
      .toggleLang {
        text-align: right;
        padding-right: 35px;
        float: right;
        .el-form-item__label {
          color: #FFF!important;
        }
      }
      .logo {
        title {
          font-size: 18px;
          display: inline-block;
          vertical-align: middle;
          float: left;
          span {
            font-size: 32px;
            // font-weight: bold;
            display: block;
            // font-family: PingFang-SC-Bold;
          }
        }
        // width:230px;
        // height:60px;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        img {
          width: 90px;
          float: left;
          margin: 0 40px 0 18px;
          border-radius: 50%;
          vertical-align: middle;
          border: 1px solid #ccc;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 630px;
      }
      .logo-collapse-width {
        width: 60px;
      }
      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
  }
</style>
