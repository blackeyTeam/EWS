<template>
	<section>
		<!--查看证书-->
		<div>
			<div class="pwd-Set">
				<el-form :model="useInfo" ref="useInfo" :rules="reSetRules" label-width="140px" size="mini" >
					<!-- <el-form-item :label="key" v-for="(value, key,index) in useInfo" ::key="index">
							<input v-model="CAobj[key]" :class="{box: (key=='Public Key'||key=='Signature')}">
						</el-form-item> -->
					<div class='titTxt'>
						<p>{{$t('设置密码可以.....需要此密码。')}}</p>								
						<p> {{$t('密码只能包含下列可打印的...下特殊字符')}}</p>
					</div>
					<el-form-item :label="$t('用户名')+'：'" >
					<el-input v-model="useInfo.userName" disabled></el-input>
					</el-form-item>
					<el-form-item :label="$t('原始密码')+'：'"  prop="oldpassword">
						<el-input v-model="useInfo.oldpassword" type='password' :placeholder="$t('请输入')+$t('原始密码')"></el-input>
					</el-form-item>
					<el-form-item :label="$t('新密码')+'：'" prop="password">
						<el-input v-model="useInfo.password" type='password' :placeholder="$t('请输入')+$t('新密码')"></el-input>
					</el-form-item>
					<el-form-item :label="$t('再次输入新密码')+'：'"  prop="repassWord">
						<el-input v-model="useInfo.repassWord" type='password' :placeholder="$t('请再次输入')+$t('新密码')"></el-input>
					</el-form-item>
				</el-form>
				<div class="selectCaButton">
					<el-button type="primary" @click.native.prevent="reSetPwd">{{$t('应用')}}</el-button>
					<!-- <router-link to="/table/main"> -->
					<el-button type="infoBtn" @click="cancle">{{$t('取消')}}</el-button>
					<!-- </router-link> -->
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import {
		reqInfo,
		Http
	} from '../../api/api';
	
	export default {
		data() {
			var oldpassWd = (rule, value, callback) => {
				let user = JSON.parse(sessionStorage.getItem('user'));
				if (value !== user.password)
					callback(new Error('旧密码输入错误'));
				else callback()
			};
			var validatePass = (rule, value, callback) => {
				if (value !== this.useInfo.password)
					callback(new Error('两次输入密码不一致!'));
				else callback()
			};
			var passwordRule = (rule, value, callback) => {
				// if ( ! /^(?=[0-9a-zA-Z@_.]+$)/g.test(value))
				if (  /[^\x00-\xff]/g.test(value))
					callback(new Error('不可为中文字符'));
				else callback()
			};
			return {
				useInfo: {
					userName: 'admin',
					oldpassword: '',
					password: '',
					repassWord: '',
				},
				infoStore: {},
				reSetRules: {
					oldpassword: [{
							required: true,
							message: '请输入原始密码',
							trigger: 'blur'
						},
						{
							validator: oldpassWd,
							trigger: 'change'
						}
					],
					password: [{
							required: true,
							message: '请输入新密码',
							trigger: 'change'
						},
						{
							validator: passwordRule,
							trigger: 'change'
						}
					],
					repassWord: [{
							required: true,
							message: '请再次输入新密码',
							trigger: 'change',
						},
						{
							validator: validatePass,
							trigger: 'change'
						}
					],
				},
			}
		},
		methods: {
			//设置密码
			reSetPwd() {
				this.$refs.useInfo.validate((valid) => {
					if (valid) {
						console.log(valid)
						reqInfo.reSetPwd.params = this.useInfo;
						Http(reqInfo.reSetPwd).then(data => {
							console.log(data)
							const str = data == 'success' ? this.$t('设置成功') :  this.$t('设置失败');
							this.$alert(str, '', {
								confirmButtonText: this.$t('确定') ,
							});
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
	
			},
			//取消清空
			cancle() {
				// this.useInfo = JSON.parse(this.infoStore);
				this.$refs.setForm.resetFields(); //整个表重置为初始值并移除校验结果
			},
	
		},
		mounted() {
			// this.infoStore = JSON.stringify(this.useInfo)
			//"^(?=[0-9a-zA-Z@_.]+$)"
		},
	}
</script>

<style>
	.pwd-Set .el-form-item.is-required .el-form-item__label:before {
		content: '';
	}
	.pwd-Set .titTxt{border-bottom: 1px solid #E9E9E9; margin:0 0 30px 0;}
	.pwd-Set .titTxt p{margin-top: 0;}
	.pwd-Set  .el-form-item__content{width: 68%}
</style>
