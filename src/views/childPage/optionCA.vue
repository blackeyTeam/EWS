<template>
    <section>
        <!--创建新的自签名证书-->
        <div v-if="$route.params.name=='creatSignalCA'" :class='$route.params.name'>
            <div class='titTxt'>{{$t('在下面输入申请的信息（注: 创建新的证书请求时，如有先前的请求将被擦除）')}}</div>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item :label="$t('常用名称：')">
                    <el-input v-model="formLabelAlign.commonName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('组织机构：')">
                    <el-input v-model="formLabelAlign.organizationName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('部门：')">
                    <el-input v-model="formLabelAlign.organizationUnitName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('市／县：')">
                    <el-input v-model="formLabelAlign.localityName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('省 / 直辖市 / 自治区：')">
                    <el-input v-model="formLabelAlign.provienceName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('国家／地区：')">
                    <el-input v-model="formLabelAlign.countryName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('签名算法：')">
                    <!-- <select class="input-xlarge single" name="签名算法">
                                            <option value="SHA256">SHA256</option>
                                            <option value="Your">SHA256</option>
                                        </select> -->
                    <el-select v-model="valueSHA">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="selectCaButton">
                    <el-button type="primary" @click="creatSingleCA">{{$t('下一步')}}</el-button>
                    <router-link to="/table/selectCA">
                        <el-button type="infoBtn">{{$t('取消')}}</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
        <!--创建证书申请-->
        <div v-if="$route.params.name=='applyCA'" :class='$route.params.name'>
            <div class='titTxt'>{{$t('在下面输入申请的信息（注: 创建新的证书请求时，如有先前的请求将被擦除）')}}</div>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item :label="$t('常用名称：')">
                    <el-input v-model="formLabelAlign.commonName" placeholder="请输入常用名称"></el-input>
                </el-form-item>
                <el-form-item :label="$t('组织机构：')">
                    <el-input v-model="formLabelAlign.organizationName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('部门：')">
                    <el-input v-model="formLabelAlign.organizationUnitName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('市／县：')">
                    <el-input v-model="formLabelAlign.localityName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('省 / 直辖市 / 自治区：')">
                    <el-input v-model="formLabelAlign.provienceName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('国家／地区：')">
                    <el-input v-model="formLabelAlign.countryName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('签名算法：')">
                    <!-- <select class="input-xlarge single" name="签名算法">
                                            <option value="SHA256">SHA256</option>
                                            <option value="Your">SHA256</option>
                                        </select> -->
                    <el-select v-model="valueSHA">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="selectCaButton">
                    <el-button type="primary" @click="onApplyCaSubmit">{{$t('下一步')}}</el-button>
                    <router-link to="/table/selectCA">
                        <el-button type="infoBtn">{{$t('取消')}}</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
        <!--认证已创建是否保存-->
        <div v-if="$route.params.name=='submit'" :class='$route.params.name'>
            <div>
                <i class="el-icon-circle-check checkHook"></i> {{$t('认证请求已创建')}}
                <p>{{$t('证书申请必须是 PEM/Base64 编码，并需要提供给认证中心来生成和签署证书。')}}</p>
                <p>{{$t('单击“保存”保存证书申请以提交给认证中心。')}}</p>
            </div>
            <div class="selectCaButton">
                <el-button type="primary" @click="downLoadCA">{{$t('保存')}}</el-button>
                <router-link to="/table/selectCA">
                    <el-button type="infoBtn">{{$t('取消')}}</el-button>
                </router-link>
            </div>
        </div>
        <!--安装证书-->
        <div v-if="$route.params.name=='installCA'" :class='$route.params.name'>
            <div>
                <p>{{$t('安装证书颁发机构为您创建的证书（注: 必须已使用此打印机生成的最新证书申请创建证书）')}}</p>
            </div>
            <div class="selectCaButton">
                <el-upload class="upload-demo" method="post" action="/cgi-bin/upload_crt.lua" :on-preview="handlePreview" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :before-upload="beforeAvatarUpload"
                    accept=".crt">
                    <el-button size="small" type="primary">{{$t('上传证书')}}</el-button>
                    <div slot="tip" class="el-upload__tip">( {{$t('限制份数：')}} 1 )</div>
                </el-upload>
            </div>
        </div>
        <!--导入证书与私钥-->
        <div v-if="$route.params.name=='importCA'" :class='$route.params.name'>
            <div>
                <p>{{$t('安装证书颁发机构为您创建的证书（注: 必须已使用此打印机生成的最新证书申请创建证书）')}}</p>
            </div>
            <div class="selectCaButton">
                <el-upload class="upload-demo imCAinp" method="post" action="/cgi-bin/upload_crt.lua" :on-preview="handlePreview" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" accept=".crt">
                    <el-button size="small" type="primary">{{$t('上传证书')}}</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">( {{$t('限制份数：')}} 1 )</div> -->
                </el-upload>
                <el-form ref="form" label-width="59px" size="mini">
                    <el-form-item :label="$t('密码')+':'">
                        <el-input v-model="importPwd"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="selectCaButton">
                <el-button type="primary" @click="importCASub">{{$t('完成')}}</el-button>
                <router-link to="/table/selectCA">
                    <el-button type="infoBtn">{{$t('取消')}}</el-button>
                </router-link>
            </div>
        </div>
        <!--弹窗-->
        <el-card class="box-card opDiv" v-if="opDiv">
            <div class="progress">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" v-if="progress"></el-progress>
                <p v-if="progress">{{$t('生成证书申请中')}} ...</p>
                <i v-if="!progress" class="el-icon-circle-check"></i>
                <p v-if="!progress">{{$t('自签名证书已更新')}}</p>
            </div>
            <el-button style="float: right; margin: -10px -50px 0 0" type="text" @click="popDiv">X</el-button>
        </el-card>
    </section>
</template>

<script>
    import {
        reqInfo,
        getHttp,
        postHttp,
        Http
    } from '../../api/api';
    export default {
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    commonName: '',
                    organizationName: 'Hannto Technology Inc',
                    organizationUnitName: 'Product Department',
                    localityName: 'SH',
                    provienceName: 'SH',
                    countryName: 'CN',
    
                },
                options: [{
                    value: 'SHA256',
                    label: 'SHA256'
                }],
                valueSHA: 'SHA256', //签名下拉选项值
                fileList: [], //证书载体
                importPwd: '',
                opDiv: false,
                progress: true,
    
            };
        },
        methods: {
            //提交证书申请列表
            onApplyCaSubmit(e) {
                const self = this;
                self.opDiv = true;
                let ctg = e.currentTarget;
                ctg.setAttribute("disabled", true);
                ctg.classList.remove('el-button--primary');
                ctg.classList.add('el-button--info');
                // console.log(e.currentTarget)
                getHttp({
                    url: reqInfo.onApplyCA.url,
                    params: self.formLabelAlign
                }).then(res => {
                    self.opDiv = false;
                    self.$router.push('/table/optionCA/submit')
                }).catch(function(error) {
                    alert(error);
                })
            },
            //下载证书
            downLoadCA() {
                // const self = this;
                // getHttp({
                //     url: '/ca.crt',
                //     // params: self.formLabelAlign
                // }).then(res => {
    
                // }).catch(function(error) {
                //     alert(error);
                // })
                window.open('/ca.csr')
            },
            //上传证书
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                if (file && file.status === "success") {
                    return this.$confirm(`确定移除 ${ file.name }？`); //删除
                }
            },
            beforeAvatarUpload(file) {
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    this.$message.error('上传的证书文件大小不能超过 5MB!');
                }
                return isLt5M;
            },
            //创建自签名证书
            creatSingleCA() {
                const self = this;
                self.opDiv = true;
                getHttp({
                    url: reqInfo.creatSignalCA.url,
                    params: self.formLabelAlign
                }).then(res => {
                    self.progress = false;
                }).catch(function(error) {
                    alert(error);
                })
            }, //导入证书
            importCASub() {
                const self=this;
                getHttp({
                    url: reqInfo.importCApwd.url,
                    params:{passwd:self.importPwd} 
                }).then(res => {
                }).catch(function(error) {
                    // alert(error);
                })
            },
            //获取证书常用名称
            reqCommonName() {
                let self = this;
                Http({
                    url: reqInfo.reqCaCommonName.url
                }).then(res => {
                    console.log(res)
                    self.formLabelAlign.commonName = res;
                })
            },
            popDiv() {
                this.opDiv = false;
            },
    
        },
        created() {
            let path = this.$route.path;
            if (path.indexOf('creatSignalCA') != -1 || path.indexOf('applyCA') != -1) {
                //   let CAobj=JSON.parse(sessionStorage.getItem('CAobj'));
                this.reqCommonName();
                //    this.CAobj=CAobj;
            }
            console.log(path.indexOf('creatSignalCA') || path.indexOf('applyCA'))
        },
    }
</script>

<style>
    /***********.creatSignalCA****************/
    
    .applyCA .titTxt,
    .creatSignalCA .titTxt， {
        height: 55px;
        border-bottom: 1px solid #E9E9E9;
    }
    .applyCA .el-button--info{margin-right: 20px;}
    .applyCA .el-form-item__label,
    .creatSignalCA .el-form-item__label {
        width: 150px!important;
        font-weight: 500;
    }
    
    .el-form--label-center .el-form-item__label {
        text-align: center;
    }
    
    .applyCA .el-input,
    .creatSignalCA .el-input {
        width: 270px;
    }
    
    .importCA .el-input {
        display: inline;
    }
    
    .imCAinp {
        float: left;
    }
    
    .importCA .el-input__inner {
        width: 100%!important;
    }
    
    .importCA .el-form {
        width: 213px;
        display: inline-block;
    }
    
    .el-input__inner {
        height: 40px;
    }
    
    .el-form-item {
        margin-bottom: 10px;
    }
    
    .creatSignalCA select {
        width: 158px;
        height: 26px;
    }
    
    .selectCaButton {
        margin: 10px 0 10px 0;
        float: right;
    }
    
    .checkHook {
        margin-right: 10px;
    }
    
    .selectCaButton .el-button--primary,
    .selectCaButton .el-button--default {
        margin-right: 20px;
    }
</style>

