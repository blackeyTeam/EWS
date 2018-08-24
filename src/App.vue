<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<div>
				<headerc></headerc>
				<router-view></router-view>
			</div>			
		</transition>
	</div>
</template>

<script>

export default {
	name: 'app',
	components: {
      headerc: function (resolve, reject) {
        require(['./common/headerCpt.vue'], resolve)
      }
    },
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: PingFang SC,Helvetica Neue, Helvetica,  Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	// font-family: PingFang-SC-Medium;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	background: rgb(245, 245, 245);
	color:#8D8D8D!important;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}
.el-form-item__label{font-size: 12px !important;}
.toolbar {
	background: #FFF;
	padding: 10px;
	height: 70px;
    border-bottom: 1px solid #E9E9E9;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.el-form-item__error{
	top: 87%!important;
}
/******全局按钮重置*********/
.el-button--infoBtn{
	color: #8D8D8D!important;
    background-color: #F8F8F8!important;
    border-color: #DEDEDE!important;
}
.el-button--primary{
	background-color: #00A6CE!important;
	border-color: #00A6CE!important;
}
.el-button{border-radius: 4px!important;width: 130px;line-height: 30px!important;padding: 0px!important;}
.el-button.is-loading{background-color: #00A6CE!important;padding:0!important;line-height:30px !important;}
.el-button.is-loading:before{background-color: rgba(255,255,255,0)!important;}
.el-input__inner{border: 1px solid #fff;}
.el-input.is-disabled .el-input__inner{background: none!important;}
.login-container   .el-form-item__content{box-sizing: border-box;  } 
   /***********.全局弹窗****************/
    
    .opDiv {
        width: 70%;
        height: 235px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    
    .opDiv .progress {
        width: 60%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    
    .el-progress-bar__inner {
        background-color: #00C2FF;
    }
    
    .opDiv p {
        margin-top: 35px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    
    .opDiv i {
        display: block;
        margin: auto;
        width: 20px;
	}
	/*用戶列表部分勾選框重置*/
	.el-table th{text-align: center!important;}
	.el-icon-circle-check{color: #00A6CE;}
	.el-table tr,.el-table td,.el-table th{   border: none!important;color: #8D8D8D; } 
	.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
		    background-color: #00A6CE!important;
    		border-color: #00A6CE!important;
	}
	.cellBorder  .cell{border:1px solid #DEDEDE!important;margin: 0 10px;border-radius: 4px;height: 31px;}
	.el-table .cell{line-height: 28px!important;}
/***PC端居中显示**/
@media screen and (min-width:860px){/*宽度大于800px时 红色*/
	body{background-color: #E9EBED;}
	.container {
		max-width: 850px;
		min-height: 480px;
		left: 50%;
		// top: 50%;
		transform: translate(-50%,0);
		background-color: #F3F5F7;
	}
	.header-container{max-width: 850px;left: 50%;
		// top: 50%;
		transform: translate(-50%,0);}
}
.toggleLang .el-form-item__label{color: #FFF!important;}
.el-switch.is-checked .el-switch__core {
    border-color: #FFF!important;
    background-color: #23BDDB!important;
}
.el-form-item__error{position: static!important;}
</style>