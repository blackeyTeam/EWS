<template>
	<section>
		<div class='systemUpdate'>
			<el-form ref="form" label-width="130px" size="mini">
				<el-form-item :label="$t('Firmware Version')+':'">
					<el-input :value="$t(firmware.version)" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('Build Date')+':'">
					<el-input v-model="firmware.build_date" disabled></el-input>
				</el-form-item>
			</el-form>
			<div class="btnBon">
				<el-button type="primary" @click="checkVersion" v-if="!dispearBtn">{{$t('Check Update')}}</el-button>
				<div class="noUpdate" v-if="dispearBtn&&!hasNewVer">
					<el-button type="info" :class="{box: 1}">{{$t('Check Update')}}</el-button>
					<span class='versonTxt'>{{$t('固件是最新版本')}}</span>
				</div>
				<div class="Update" v-if="dispearBtn&&hasNewVer">
					<el-button type="primary" @click="pollingStatu" v-if="latestVersion!='unknownVersion'">{{$t('Update Firmware')}}</el-button>
					<el-button type="info" v-else >{{$t('Update Firmware')}}</el-button>
					<div class='versonTxt'>
						<p>{{$t('最新固件')}}:</p>
						<p>{{$t(latestVersion)}}</p>
					</div>
				</div>
			</div>
		</div>
		<!--弹窗-->
		<el-card class="box-card opDiv" v-if="opDiv">
			<div class="progress">
				<el-progress :text-inside="true" :stroke-width="18" :percentage="strokePCT" v-if="progress"></el-progress>
				<p v-if="progress">{{$t('固件升级中!')}}...</p>
				<i v-if="!progress" :class="[success?'el-icon-circle-check':'el-icon-circle-close']"></i>
				<p v-if="success&&!progress">{{$t('固件更新成功')}}</p>
				<p v-if="!success&&!progress">{{$t('固件更新失败')}}</p>
			</div>
			<el-button style="float: right; padding: 3px 0" type="text" @click="popDiv">关闭</el-button>
		</el-card>
	</section>
</template>

<script>
	import {
		reqInfo,
		getHttp,
		postHttp,
        Http,
        uploadRes
	} from '../../api/api111';
	export default {
		data() {
			return {
				firmware: {
					version: "",
					new_version: "",
					build_date: "",
					upgradeUrl: '',
				},
				hasNewVer: false,
				latestVersion: '',
				dispearBtn: false,
				opDiv: false,
				strokePCT: 0, //进度读取
				progress: true, //更新进度条显示
				success: true, //固件更新成功标识
				timer: null,
				timer2: null,
				n: 0, //40%-80% 循环叠加计次
			}
	
		},
		methods: {
			popDiv() {
				this.opDiv = false;
				this.progress = true;
				this.success = true;
				console.log(22)
			},
			//检测获取固件最新版本
			getLatestVersion(autoCheck) {
				const self = this;
				let firmware = JSON.parse(sessionStorage.getItem('firmware'));
                Http({
                    url: reqInfo.getLatestVersion.url
                }).then(res => {
                    console.log(res)
                    let data = res.data ;
                    self.firmware = data
                    if (Object.keys(data).length != 0) {
                        if (autoCheck) { //继承更新检测
                            console.log(11)
                            data.version == data.new_version ?
                                (() => {
                                    self.strokePCT = 100;
                                    self.progress = false;
                                    self.success = true;
                                    self.hasNewVer = false;
                                })() //更新成功
                                :
                                (() => {
                                    self.progress = false;
                                    self.success = false;
                                })();
                        }
                        console.log(data)
                        self.firmware = data
                        sessionStorage.setItem('firmware', JSON.stringify(data))
                    }
                }).catch(function(error) {
                    uploadRes('获取版本信息异常，请检查设备和网络 !')
                })
			},
			checkVersion() {
				this.hasNewVer = this.firmware.version == this.firmware.new_version ? false : true;
				this.latestVersion = this.firmware.new_version;
				this.dispearBtn = true;
			},
			//更新下载版本
			updateVersion() {
				const self = this;
				self.opDiv = true;
				getHttp({
					url: reqInfo.updateVersion.url
				}).then(res => {
				    console.log(res)
					if (res && res.data.code == 200) {
						self.strokePCT = parseInt(res.data.data); //记录下载进度
						if (self.strokePCT == -1) {
							self.success = false; //更新失败
							clearInterval(self.timer)
						} else if (self.strokePCT >= 40) { //40%后停止请求进入自动迭代
							clearInterval(self.timer)
							self.timer2 = setInterval(self.autoCount, 10000);
						}
					} else {
						alert(res.data.message);
					}
					// setTimeout(()=> self.opDiv = false,2000)
				}).catch(function(error) {
					console.log(error);
				})
	
			},
			//轮询下载进度
			pollingStatu() {
				const self = this;
				self.strokePCT = 0; //重置
				self.n = 0;
				Http({
					url: reqInfo.upgradeUrl.url+'?upgradeUrl='+self.firmware.upgradeUrl
				}).then(res => {
					if (res.code) {
						self.updateVersion();
						self.timer = setInterval(self.updateVersion, 2000)
					}
				});
			},
			//自动迭代
			autoCount() {
				const self = this;
				self.n++;
				self.strokePCT > 99 ? self.strokePCT = 99 : self.strokePCT += Math.round(Math.random() * 4); //：<7随机sun不超过88%
				console.log(66);
				if (self.n >= 12) { //2分钟时检测版本更新情况

					console.log('自动迭代版本更新情况！',self.n)
					clearInterval(self.timer2)
					self.getLatestVersion(true);
				}
			}
		},
		mounted() {
			this.getLatestVersion();
		},
	}
</script>

<style>
	.systemUpdate {
		width: 440px;
		height: 170px;
	}
	
	.systemUpdate .el-form-item {
		/* font-weight: bold; */
	}
	
	.systemUpdate .btnBon {
		padding-top: 10px;
	}
	
	.el-form-item__content {
		margin-left: 10px;
	}
	
	.el-form-item__content input {
		height: 30px;
		text-align: center;
	}
	
	.el-form-item__content input.box {
		height: 100px;
	}
	
	.systemUpdate .el-form-item__label {
		padding: 0 20px 0 0;
	}
	
	.btnBon {
		margin-left: 130px;
	}
	
	.Update button {
		float: left;
	}
	
	.Update div {
		margin-left: 150px;
		height: 32px;
	}
	
	.versonTxt {
		color: #C6C9CF;
		font-size: 12px;
		margin-left: 10px;
	}
	
	.Update p {
		margin: 0;
	}
	
	.systemUpdate .el-input {
		width: 90%
	}
	
	.el-progress-bar__inner {
		background-color: #00A6CE !important
	}
</style>
