<template>
	<section class='inkLine'>
		<h4>{{$t('当打印头有异常时，请尽快联系客服（400-000-0000）解决')}}</h4>
		<ul>
			<!-- <li><i class="el-icon-star-on yellow"></i></i>彩色打印头<span><i class="el-icon-star-on black"></i>{{printHead.colorful}}</span></li>
			<li><i class="el-icon-star-on black"></i>黑色打印头<span><i class="el-icon-circle-close"></i>{{printHead.black}}</span></li> -->
		 <li v-for="(value, key,index) in printHead" :key="index" :class="{lastLi:index==3}">
                <i :class="['el-icon-menu', {'black':key=='BlackCartridge'},{'colorful':key=='colorCartridge'}]"></i>{{$t(key)}}
                <span :class="[value=='打印头正常' ? 'blue':'red']"><i :class="[value=='打印头正常' ? iconTipR :iconTipW]"></i>{{$t(value)}}</span>
            </li>
        </ul>
	</section>
</template>
<script>
    import {
        reqInfo,
        getHttp,
        postHttp
    } from '../../api/api';
    export default {
        data() {
            return {     
                printHead: {
                    colorCartridge: '',
                    BlackCartridge: '',
                },
                iconTipR:'el-icon-circle-check',
                iconTipW:'el-icon-circle-close',
                opDiv: false,
                progress: true,
    
            };
        },
        methods: {
            //获取打印头状态
            getPrintHead() {
                const self = this;
                let printHead = JSON.parse(sessionStorage.getItem('printHead'));//优先取缓
                !printHead?getHttp({url: reqInfo.printHead.url}).then(res=>{
                          console.log(res)
                          let data=res&&res.data.code==200?res.data.data:{};
                            Object.keys(data).length!=0&&(self.printHead=data);
						    sessionStorage.setItem('printHead', JSON.stringify(data))
                }).catch(function (error) {
                       alert(error);                 
                }):(self.printHead=printHead);
    
            },
            
		},
		created(){
			
			this.getPrintHead();
		}
    }
</script>
<style>
 .inkLine {}
 ul{
	 list-style-type:none
 }
 .inkLine li{width: 100%; line-height: 40px;box-sizing: border-box; }
 .inkLine li span{
	 float: right;
	
 }
 .inkLine li:before{
	 /* content: "\F043"; */
	

 }
.inkLine .el-icon-star-on{position: relative;}
 /* .inkLine .el-icon-star-on:before {
    content: "";
	position: absolute;
	bottom:-2px;
	left: -20px;
    width: 15px;
    height: 15px;
} */
.blue{color: rgb(0, 194, 255);}
.red{color: rgb(255, 64, 129);}
.yellow{color: rgb(255, 230, 0);}
.black{color: rgb(7, 7, 7); background-color: rgb(7, 7, 7); }
.inkLine  .el-icon-circle-close:before, .inkLine  .el-icon-circle-check:before{
    right: 10px;
    top: 13px;
    position: absolute;
}
.inkLine  .el-icon-circle-close:before{color: rgb(255, 64, 129);}
.colorful{ background: linear-gradient(#0099CE, #EA1D76 43%, #FFD100);}
.colorful::before{content: '';}
</style>
