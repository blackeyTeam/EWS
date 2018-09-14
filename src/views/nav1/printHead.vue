<template>
	<section class='inkLine'>
		<h4>{{$t('当打印头有异常时，请尽快联系客服')}}<a href="tel:400-100-5678">（400-100-5678）</a>{{$t('解决')}}</h4>
		<ul>
			<!-- <li><i class="el-icon-star-on yellow"></i></i>彩色打印头<span><i class="el-icon-star-on black"></i>{{printHead.colorful}}</span></li>
			<li><i class="el-icon-star-on black"></i>黑色打印头<span><i class="el-icon-circle-close"></i>{{printHead.black}}</span></li> -->
		 <li v-for="(value, key,index) in printHead" :key="index" :class="{lastLi:index==3}" v-if="value">
                <i :class="['el-icon-menu', {'black':key=='BlackCartridge'},{'colorful':key=='colorCartridge'}]"></i><b>{{$t(key)}}</b>
                <span :class="[value=='ok' ? 'blue':'red']"><i :class="[value=='ok' ? iconTipR :iconTipW]" ></i>
                         <b v-if="value=='ok'||value=='contact_failure'||value=='defective'||value=='unknown'"> {{$t(value)}}</b>
                         <b v-if="value=='absent'"> {{$t(value)}}{{$t(key)}}</b>
                         <b v-if="value=='hign_temp'"> {{$t(key)}}{{$t(value)}}</b>
                         <b v-if="value=='incorrect'"> {{$t(value)}}{{$t(key)}}</b>
                </span>
            </li>
        </ul>
	</section>
</template>
<script>
import api from '../../api/index';
 const{
    reqInfo,
    getHttp,
    postHttp
  } = api;
    
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
                // let printHead = JSON.parse(sessionStorage.getItem('printHead'));//优先取缓
                getHttp({url: reqInfo.printHead.url}).then(res=>{
                          console.log(res)
                          let data=res&&res.data.code==200?res.data.data:{};
                            Object.keys(data).length!=0&&(self.printHead=data);
						    sessionStorage.setItem('printHead', JSON.stringify(data))
                }).catch(function (error) {
                       alert(error);                 
                });
    
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
 .inkLine li{width: 100%; line-height: 40px;box-sizing: border-box;overflow: hidden; }
 .inkLine li span{
	 float: right;
	 width: 182px;
     text-align: center;
    white-space: normal !important;
    padding-top: 8px;
    padding-bottom: 8px;
    line-height: 21px;
    display: inline-block;
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
.inkLine  .default:before{
    right: 10px;
    top: 13px;
    position: absolute;
    color: rgb(0, 194, 255);
}
/* .inkLine  .el-icon-circle-close:before{color: rgb(255, 64, 129);} */
.colorful{ background: linear-gradient(#0099CE, #EA1D76 43%, #FFD100);}
.colorful::before{content: '';}
a{    text-decoration: none;color:#475669;}
/* .inkLine li b{display: inline-block;} */
.inkLine li>b{    
    display: inline-block;
    position: absolute;
        top: 50%;
        left: 63px;
        transform: translate(0, -50%);
    }
</style>
