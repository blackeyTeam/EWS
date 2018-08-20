<template>
    <section class='inkLine'>
        <h4>{{$t('Estimation only. Actual status may vary.')}}</h4>
        <ul>
            <!-- <li><i class="el-icon-menu blue"></i>青色墨水<span><i :class="iconTip"></i>{{inkStatus.cyan}}</span></li>
    			<li><i class="el-icon-menu red"></i>品红墨水<span><i :class="iconTip"></i>{{inkStatus.pinkish}}</span></li>
    			<li><i class="el-icon-menu yellow"></i></i>黄色墨水<span></i>{{inkStatus.yellow}}</span></li>
    			<li class='lastLi'><i class="el-icon-menu black "></i>黑色墨水<span>{{inkStatus.black}}</span></li> -->
            <li v-for="(value, key,index) in inkStatus" :key="index" :class="{lastLi:index==3}">
                <i :class="['el-icon-menu', key]"></i>{{$t(key)}}
                <span :class="[value=='墨水瓶空' ? 'red':'blue']"><i :class="[value=='墨水瓶空' ? iconTipW :iconTipR]"></i>{{$t(value)}}</span>
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
                inkStatus: {
                    'cyan': '',
                    'pinkish': '',
                    yellow: '',
                    black: '',
                },
                iconTipR: 'el-icon-circle-check',
                iconTipW: 'el-icon-circle-close',
                opDiv: false,
                progress: true,
    
            };
        },
        methods: {
            //获取墨水状态
            getInk() {
                const self = this;
                let inkStatus = JSON.parse(sessionStorage.getItem('inkStatus')); //优先取缓
                !inkStatus ? getHttp({
                    url: reqInfo.inkLine.url
                }).then(res => {
                    console.log(res)
                    let data = res && res.data.code == 200 ? res.data.data : {};
                    Object.keys(data).length != 0 && (self.inkStatus = data);
                    sessionStorage.setItem('inkStatus', JSON.stringify(data))
                    console.log(self.inkStatus)
                }).catch(function(error) {
                    alert(error);
                }) : (self.inkStatus = inkStatus);
    
            },
    
        },
        created() {
            // console.log(this)
            this.getInk();
        },
        mounted() {
            // console.log(111)
            // this.getInk();
    
        }
    }
</script>

<style>
    .inkLine {
        color: #475669;
    }
    
    h4 {
        margin: 0;
        font-weight: 500;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    .inkLine li {
        line-height: 40px;
        position: relative;
        border-top: 1px solid #E9E9E9;
        width: 100%;
        box-sizing: border-box;
        padding: 0 83px;
    }
    
    .lastLi {
        border-bottom: 1px solid #E9E9E9;
    }
    
    .inkLine li span {
        float: right;
        width: 100px;
        text-align: center;
    }
    
    .inkLine .el-icon-star-on {
        position: relative;
    }
    
    .inkLine .el-icon-menu {
        /* content: "\E621"; */
        /* content: "\E620"; */
        position: absolute;
        top: 13px;
        left: 10px;
        width: 12px;
        height: 12px;
    }
    
    .blue {
        color: #00A6CE;
    }
    
    .red {
        color: rgb(255, 64, 129);
        ;
    }
    
    .cyan {
        color: #00A6CE;
        background-color: #00A6CE;
    }
    
    .pinkish {
        color: rgb(255, 64, 129);
        background-color: rgb(255, 64, 129);
    }
    
    .yellow {
        color: rgb(255, 230, 0);
        background-color: rgb(255, 230, 0);
    }
    
    .black {
        color: rgb(7, 7, 7);
        background-color: rgb(7, 7, 7);
    }
    
    .inkLine .el-icon-circle-close:before,
    .inkLine .el-icon-circle-check:before {
        right: 10px;
        top: 13px;
        position: absolute;
    }
    
    .inkLine .el-icon-circle-close:before {
        color: rgb(255, 64, 129);
    }
</style>
