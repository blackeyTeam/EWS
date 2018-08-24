<template>
	<section>
		<!--证书四个选项相关操作子页-->
		<router-view></router-view>
	
		<!--查看证书-->
		<div v-if="$route.params.name=='infoCA'" :class='$route.params.name'>
			<div>
				<el-form ref="form" label-width="150px" size="mini">
					<el-form-item :label="key" v-for="(value, key,index) in CAobj" :key="index">
						<el-input v-model="CAobj[key]" readonly unselectable="on"
						 :type="'textarea'" autosize resize="none"> 
						 <!-- :class="{box: (key=='pubKey:'||key=='subject:')}"> -->
						</el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	
		<!--证书配置选项-->
		<div v-if="$route.params.name=='selectCA'" :class='$route.params.name'>
			<div>
				<form>
					<!-- <div class="a">
								<input type="radio" id="creatSignalCA" name="selectCA" ref="creatSignalCA"/>
								<label for="creatSignalCA">女</label>
							</div>
							<div class="a">
								<input type="radio" id="applyCA" name="selectCA"  ref="applyCA"/>
								<label for="applyCA">男</label>
							</div>
							<div class="a">
								<input type="radio" id="installCA" name="selectCA" ref="installCA"/>
								<label for="installCA">男</label>
							</div>
							<div class="a">
								<input type="radio" id="importCA" name="selectCA" ref="installCA" />
								<label for="importCA">男</label>
							</div> -->
					<input type="radio" name="selectCA" id="creatSignalCA" ref="creatSignalCA" checked="checked">
					<label for="creatSignalCA">{{$t('创建新的自签名证书')}}
										<p>{{$t('创建自签名证书并覆盖当前安装的打印机证书')}}</p>
									</label>
					<input type="radio" name="selectCA" id="applyCA" ref="applyCA">
					<label for="applyCA">{{$t('创建证书申请')}}
										<p>{{$t('创建自签名证书并覆盖当前安装的打印机证书')}}</p>
									</label>
					<input type="radio" name="selectCA" id="installCA" ref="installCA">
					<label for="installCA">{{$t('安装证书')}}
										<p>{{$t('安装证书颁发机构为您创建的证书（注: 必须已使用此打印机生成的最新证书申请创建证书）')}}</p>
									</label>
					<input type="radio" name="selectCA" id="importCA" ref="importCA">
					<label for="importCA">{{$t('导入证书与私钥')}}
										<p>{{$t('导入证书和私钥以用作嵌入式网络服务器证书。注: 这将覆盖当前安装的打印机证书和私钥')}}</p>
									</label>
					<div class="selectCaButton">
						<el-button type="primary" @click="onScaSubmit">{{$t('下一步')}}</el-button>
						<router-link to="/table/main">
							<el-button type="infoBtn">{{$t('取消')}}</el-button>
						</router-link>
					</div>
	
				</form>
			</div>
		</div>
		<!--打印安全管理-->
		<div v-if="$route.params.name=='main'">
			<!--证书配置管理-->
			<div class='CAOption'>
				<p class='topTxt'>{{$t('默认情况下，会创建预安装的自签名打印机证书来标识此打印机您可以更改此证书，以便更精确地标识打印机并更新证书的有效时间')}}</p>
				<div class="btnBox">
					<router-link to="/table/selectCA">
						<el-button type="primary">{{$t('配置管理')}}</el-button>
					</router-link>
					<router-link to="/table/infoCA">
						<el-button type="infoBtn" @click="getInfoCA">{{$t('查看证书')}}</el-button>
					</router-link>
	
				</div>
			</div>
			<!---------用户表格-------->
			<h4>打印机用户访问权限</h4>
			<div class="userlist">
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<!-- <el-form-item>
									<el-input v-model="filters.name" placeholder="姓名"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" v-on:click="getUsers">查询</el-button>
								</el-form-item> -->
						<el-form-item>
							<el-button type="primary" @click="handleAdd">{{$t('新增')}}</el-button>
							<el-button type="infoBtn" @click="batchRemove" :disabled="this.sels.length===0">{{$t('删除')}}</el-button>
						</el-form-item>
					</el-form>
				</el-col>
	
				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;text-align: center;" :cell-class-name='cellBox'>
					<el-table-column type="selection" width="65" label="选择">
					</el-table-column>
					<!-- <el-table-column type="index" width="0" >
							</el-table-column> -->
					<el-table-column prop="name" :label="$t('用户')" width="150">
					</el-table-column>
					<!-- <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
							</el-table-column>
							<el-table-column prop="age" label="年龄" width="100" sortable>
							</el-table-column>
							<el-table-column prop="birth" label="生日" width="120" sortable>
							</el-table-column> -->
					<el-table-column prop="password" :label="$t('密码')" min-width="150">
					</el-table-column>
					<!--每条编辑和删除操作-->
					<!-- <el-table-column label="操作" width="150">
								<template slot-scope="scope">
									<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
</template>
				</el-table-column> -->
			</el-table>

			<!--分页工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
        </div>
			<!--编辑界面-->
			<!-- <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="editForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-radio-group v-model="editForm.sex">
							<el-radio class="radio" :label="1">男</el-radio>
							<el-radio class="radio" :label="0">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="年龄">
						<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
					</el-form-item>
					<el-form-item label="生日">
						<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
					</el-form-item>
					<el-form-item label="地址">
						<el-input type="textarea" v-model="editForm.addr"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog> -->

			<!--新增界面-->
			<el-dialog :title="$t('新增')"  :visible="addFormVisible" :close-on-click-modal="false"  :modal='false' :before-close="handleClose">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item :label="$t('用户名')" prop="name">
						<el-input v-model="addForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="$t('密码')" prop="password">
						<el-input v-model="addForm.password" auto-complete="off"></el-input>
					</el-form-item>
					<!-- <el-form-item :label="$t('权限')">
						<el-input type="textarea" v-model="addForm.privilege"></el-input>
					</el-form-item> -->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">{{$t('取消')}}</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">{{$t('提交')}}</el-button>
				</div>
			</el-dialog>
		</div>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import {
		getUserListPage,
		removeUser,
		batchRemoveUser,
		editUser,
		addUser,
		Http,
		reqInfo
	} from '../../api/api';
	
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
	
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				// editForm: {
				// 	id: 0,
				// 	name: '',
				// 	sex: -1,
				// 	age: 0,
				// 	birth: '',
				// 	addr: ''
				// },
	
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
						required: true,
						message: this.$t('请输入') + this.$t('用户名'),
						trigger: 'blur'
					}]
				},
				//新增界面数据
				addForm: {
					name: '',
					password: '',
					privilege: ''
				},
				//查看证书信息
				CAobj: {
					'version': '1.0.0',
					'Serial Number': '1.0.0',
					'Issued Organization': '1.0.0',
					'Serial Number': '1.0.0',
					'Serial Number': '1.0.0',
					'Issued Date': '1.0.0',
					'Expiration Date': '1.0.0',
					'Subject': '1.0.0',
					'Public Key': '1.0.0',
					'Extension': '1.0.0',
					'Signature': '1.0.0',
					'Private Key': '1.0.0',
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
	
			}
		},
		methods: {
			onScaSubmit() {
				Object.values(this.$refs).filter(item => {
						return !item == false;
					}) //过滤稀疏数组
					.forEach(ele => {
						console.log(ele)
						ele.checked == true ? this.$router.push('/table/optionCA/' + ele.id) : false;
					});
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					console.log(res)
					// this.total = res.data.total;
					this.users = res.data.data;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						name: row.id
					};
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
	
				});
			},
			//显示编辑界面
			// handleEdit: function (index, row) {
			// 	this.editFormVisible = true;
			// 	this.editForm = Object.assign({}, row);
			// },
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					password: '',
					privilege: ''
				};
			},
	
			//新增
			addSubmit: function() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
	
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			handleClose(done) {
				this.$confirm(this.$t('确认关闭') + '?', {
						confirmButtonText: this.$t('确定'),
						cancelButtonText: this.$t('取消'),
					})
					.then(_ => {
						done();
						this.addFormVisible = false;
					})
					.catch(_ => {});
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function() {
				var ids = this.sels.map(item => item.name).toString();
				this.$confirm(this.$t('确认删除选中记录吗') + '？', this.$t('提示'), {
					confirmButtonText: this.$t('确定'),
					cancelButtonText: this.$t('取消'),
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						name: ids
					};
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: this.$t('删除成功'),
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
	
				});
			},
			cellBox({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				//第1、2列添加 cellBorder 类
				if (columnIndex == 1 || columnIndex == 2) {
					return 'cellBorder'
				}
			},
			getInfoCA() {
				let self = this;
				Http({
					url: reqInfo.reqInfoCA.url
				}).then(res => {
					console.log(res)
					self.CAobj = res;
					sessionStorage.setItem('CAobj', JSON.stringify(self.CAobj));
				})
			}
		},
		created() {
			if (this.$route.path == '/table/infoCA') {
				let CAobj = JSON.parse(sessionStorage.getItem('CAobj'));
				!CAobj && this.getInfoCA();
				this.CAobj = CAobj;
			}
			console.log(this.$route)
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style scoped>
	/* **查看证书* */
	
	.el-form-item {
		margin-bottom: 0;
		font-weight: bold;
	}
 .el-textarea__inner {
		/* height: 24px; */
		width: 280px;
		white-space: normal!important;
		word-wrap: break-word;
		word-break: break-all;
        margin-bottom:10px; 
		background-color: #000!important;
	}
	
	.el-form-item__content input.box {
		height: 100px;
	}
	
	.btnBox {
		margin: 25px 0 30px 0;
	}
	
	.btnBox button {
		border-radius: 1px;
		font-weight: bold;
		margin-right: 25px;
	}
	
	
	/* **配置证书* */
	
	.selectCA p {
		margin: 0 0 0 68px;
		line-height: 28px;
	}
	
	.selectCA form {
		padding: 0 0 0 25px;
	}
	
	.selectCA form input {
		/* margin: 40px 32px 0 20px; */
	}
	
	.selectCA form input:after {
		width: 6px;
		height: 5px;
		border-radius: 100%;
		background-color: #000;
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) scale(0);
		transition: transform 0.15s ease-in;
	}
	
	.selectCaButton {
		margin: 100px 0 40px 44px;
	}
	
	.selectCaButton button {
		width: 140px;
		margin-left: 10px;
	}
	
	.CAOption {
		background: #fff;
		padding: 10px 18px 10px 20px;
	}
	
	.topTxt {
		/* height: 50px; */
		border-bottom: 1px solid #e9e9e9;
		padding-bottom: 13px;
	}
	
	.CAOption+h4 {
		color: #475669;
		font-size: 18px;
		font-weight: 500;
		line-height: 35px;
		border-bottom: 1px dashed #ccc;
		width: 100%;
		margin: 20px 0 32px 0px;
	}
	
	.userlist {
		background: #fff;
		overflow: hidden;
	}
	
	.userlist .el-button {
		margin-right: 20px;
	}
	
	label {
		padding-left: 67px;
		position: relative;
	}
	
	input[type="radio"]+label::before {
		content: "\a0";
		/*不换行空格*/
		display: inline-block;
		vertical-align: middle;
		font-size: 18px;
		width: 1em;
		height: 1em;
		margin-right: .4em;
		border-radius: 50%;
		border: 1px solid #ccc;
		text-indent: .15em;
		line-height: 1;
		box-sizing: border-box;
		position: absolute;
		left: 10px;
		top: 4px;
	}
	
	input[type="radio"]:checked+label::before {
		background-color: #00A6CE;
		background-clip: content-box;
		border: 1px solid #00A6CE;
		padding: .2em;
		box-sizing: border-box;
	}
	
	input[type="radio"] {
		position: absolute;
		clip: rect(0, 0, 0, 0);
	}
	
</style>