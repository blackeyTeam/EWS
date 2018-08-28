<template>
	<section>
		<el-form label-width="150px" :model="formLabelAlign" ref="formBox" class='form' :rules="Rules">
			<!-- <el-form-item :label="key" v-for="(value, key,index) in formLabelAlign"::key="index" >
																		<input  v-model="formLabelAlign[key]" :disabled="setAirPrint"  unselectable="on" >
																</el-form-item> -->
			<p>{{$t('通过 AirPrint™，可从 Apple 支持的产品实现轻松的网络打印—无需安装任何驱动程序或下载任何软件')}}</p>
			<el-form-item :label="$t('AirPrint™状态')+':'">
				<el-input :value='$t(bonjourStatus)' class='bonjour'></el-input>
			</el-form-item>
			<el-form-item :label="$t('打印机Bonjour名称')+':'" prop='bonjourServiceName'>
				<el-input v-model="formLabelAlign.bonjourServiceName"></el-input>
			</el-form-item>
			<el-form-item :label="$t('打印机位置')+':'">
				<el-input v-model="formLabelAlign.bonjourServiceNote"></el-input>
			</el-form-item>
			<el-form-item :label="$t('地理位置（经度）')+':'">
				<el-input v-model="formLabelAlign.locationLongitude"></el-input>
			</el-form-item>
			<el-form-item :label="$t('地理位置（维度）')+':'">
				<el-input v-model="formLabelAlign.locationLatitude"></el-input>
			</el-form-item>
			<el-form-item :label="$t('地理位置（海拔）')+':'">
				<el-input v-model="formLabelAlign.locationAltitude"></el-input>
			</el-form-item>
			<div class="selectCaButton" v-if="!setAirPrint">
				<el-button v-if="!openAirPrint" type="primary" @click="toggleAirPt('打开')">{{$t('打开AirPrint™')}}</el-button>
				<el-button v-if="openAirPrint" @click="toggleAirPt('关闭')">{{$t('关闭AirPrint™')}}</el-button>
				<el-button :class="{'el-button--primary':openAirPrint}" :disabled="!openAirPrint" @click="setApt">{{$t('设置')}}</el-button>
			</div>
			<div class="selectCaButton" v-if="setAirPrint">
				<el-button type="primary" @click="saveApt">应用</el-button>
				<el-button @click="cancleApt">取消</el-button>
				<!-- <el-button  :class="{'el-button--primary':openAirPrint}" :disabled="!openAirPrint" @click="setApt">设置</el-button> -->
			</div>
		</el-form>
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
				labelPosition: 'center',
				formLabelAlign: {
					bonjourServiceName: '',
					bonjourServiceNote: '',
					locationLongitude: '',
					locationLatitude: '',
					locationAltitude: '',
				},
				encodeForLa:{},
				bonjourStatus: '',
				yetformLabel: {},
				openAirPrint: false,
				setAirPrint: false,
				opDiv: false,
				progress: true,
				Rules: {
					bonjourServiceName: [{
						required: true,
						message: this.$t('不可为空'),
						trigger: 'blur'
					}],
				},
	
			};
		},
		methods: {
			AirptInfo: (self) => {
	
				Http(reqInfo.AirptInfo).then(data => {
					self.formLabelAlign = data;
					console.log(data)
				})
				self.setReadonly(true)
			},
			//获取AirPrint开闭状态
			AirptStatu: self => {
				getHttp({
					url: reqInfo.AirptStatu.url
				}).then(res => {
					let data;
					res && res.data.code && (data = res.data)
					self.openAirPrint = (data.code == 200 && data.data == '打开') ? true : false;
					self.bonjourStatus = data.data;
					console.log(self.bonjourStatus)
				}).catch(err => {
					console.log(err)
				})
	
			},
			toggleAirPt(value) {
				this.openAirPrint = value == '打开' ? true : false;
				let rqUrl = value == '打开' ? reqInfo.openAirPrt.url : reqInfo.closeAirPrt.url;
				Http({
					url: rqUrl
				})
			},
			//设置AirPrint
			setApt(value) {
				this.setAirPrint = true;
				this.setReadonly(false)
				this.yetformLabel = JSON.stringify(this.formLabelAlign);
			},
			//保存设置
			saveApt() {
				const self = this;
				self.setAirPrint = false;
				self.setReadonly(true)
				sessionStorage.setItem('formLabelAlign', JSON.stringify(self.formLabelAlign));
				for (const key in self.formLabelAlign) {
					if (self.formLabelAlign.hasOwnProperty(key)) {
						self.encodeForLa[encodeURIComponent(key)] = encodeURIComponent(self.formLabelAlign[key])	
					}
				}
				console.log(self.formLabelAlign)
				getHttp({
					url: reqInfo.saveAirPrtList.url,
					params: self.encodeForLa,
				}).then(res => {
					// self.opDiv = true;
					// self.progress = false;
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})
	
			},
			//取消设置
			cancleApt() {
				const self = this;
				this.setAirPrint = false;
				this.formLabelAlign = JSON.parse(self.yetformLabel)
				self.setReadonly(true)
			},
			//设置只读属性
			setReadonly(bool) {
				let inp = this.$refs.formBox.$el.getElementsByTagName('input');
				if (bool) {
					[].forEach.apply(inp, [(item, i) => {
						item.setAttribute("disabled", bool);
						item.removeAttribute("clearable");
					}])
				} else {
					[].forEach.apply(inp, [(item, i) => {
						i != 0 && item.removeAttribute("disabled");
						item.setAttribute("clearable", '');
					}])
				}
	
			}
		},
		created() {
	
		},
		mounted() {
			let famL = JSON.parse(sessionStorage.getItem('formLabelAlign'))
			if (famL) this.formLabelAlign = JSON.parse(sessionStorage.getItem('formLabelAlign'));
			this.AirptStatu(this);
			this.AirptInfo(this)
		},
	}
</script>