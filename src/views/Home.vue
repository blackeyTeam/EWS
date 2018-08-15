<template>
	<el-row class="container">
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active='"systemUpate"' class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">
						<!-- <el-menu-item :index="item.path"  >
							{{item.name}}
						</el-menu-item> -->
						<!--折叠导航菜单-->
						<!-- <el-submenu :index="index+''" v-if="!item.leaf"> -->
							<!-- <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template> -->
							<!--二级菜单-->
							<el-menu-item v-for="child in item.children" :class="{'is-active':child.path==$route.path}"
							:index="child.url||child.path" :key="child.path" v-if="!child.hidden">
								{{$t(child.name)}}
							</el-menu-item>
						<!-- </el-submenu> -->		
					</template>
					<el-button class='logoutBtn' @click.native="logout">{{$t('登出')}}</el-button>
					<!-- <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item> -->
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$t($route.path.replace(/\//g, ''))}}</strong>
						<!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb> -->
					</el-col>
					<el-col :span="24" class="content-wrapper"  :class="{'userAndOptCA':$route.path=='/table/main'}">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'米家喷墨打印机Pro',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm(this.$t('确认退出吗')+'?', this.$t('提示'), {
					  confirmButtonText: this.$t('确定'),
                      cancelButtonText: this.$t('取消'),
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	.logoutBtn{width: 120px; margin:100px 0 0 0;background: #F8F8F8;}
	.is-active{color:#00A6CE;background: #EAF8FB;border-right:6px solid #00A6CE;}
	.container {
		// position: absolute;
		// top: 0px;
		// bottom: 0px;
		width: 100%;
		// overflow-x: hidden;
		.main {
			display: flex;
			aside {
				flex:0 0 230px;
				width: 230px;
				// font-weight: bold;
				font-weight: 500;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				padding-top: 10px;
				margin:30px 0 0 40px;
				.el-menu{
					height: 521px;
					background:#FFF;
					text-align: center;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
				.el-menu-item{
					    height: auto;
						line-height: 21px;
						margin: 18px auto;
						white-space: normal !important;
						padding-top: 8px;
						padding-bottom: 8px;
				}
				.el-menu-item:hover{background-color:#EAF8FB!important;}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 168px;
				width: 168px;
			}
			.content-container {
				flex:1;
				// overflow-y: scroll;
				padding: 40px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						float: left;
						color: #475669;
						font-size: 18px;
						font-weight: 500;
						line-height: 35px;
						border-bottom: 1px dashed #ccc;
						width: 100%;
						margin-bottom: 32px;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color:#FFF;
					box-sizing: border-box;
					padding: 30px;
					width: 490px;
										
				}
				
			}
			
		}
		
	}
	.userAndOptCA.content-wrapper{background-color: #F3F5F7!important;padding: 0!important;}
</style>