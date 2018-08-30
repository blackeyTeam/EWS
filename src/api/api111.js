import axios from 'axios';
import Qs from 'qs';
import {i18n} from '../main';
// import VueI18n from 'vue-i18n' ;
import { MessageBox } from 'element-ui';
// import config from './config';

// let base = 'https://192.168.203.214';
let base = '/cgi-bin'

// export const requestLogin = params => { return axios.get(`${base}/login`, { params: params}).then(res => res.data); };
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const getUserListPage = params => { return axios.get(`${base}/query_user.lua`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/remove_user.lua`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/add_user.lua`, { params: params }); };

export const test = params => { return axios.get(`m.lvmama.com`, { params: 1 }); };

export const reqInfo={
    requestLogin:{
        url: `${base}/auth.lua`,
        // url : `${base}/login`,
        method: "GET",
        params: {}
    },
    getLatestVersion: {
        url: `${base}/query_system.lua`,
        method: "GET",
        params: {}
    },
    updateVersion: {
        url: `${base}/query_process.lua`,
        method: "GET",
        params: {}
    },
    upgradeUrl: {
        url: `${base}/upgrade.lua`,
        method: "GET",
        params: {}
    },
    inkLine: {
        url: `${base}/ink_capacity.lua`,
        method: "GET",
        params: {}
    },
    printHead: {
        url: `${base}/print_head.lua`,
        method: "GET",
        params: {}
    },
    AirptInfo: {
        url: `${base}/query_bonjour.lua`,
        method: "GET",
        params: {}
    },
    AirptStatu: {
        url: `${base}/status.lua`,
        method: "GET",
        params: {}
    },
    // toggleAirPrt: {
    //     url: `${base}/printHead.lua`,
    //     method: "GET",
    //     params: {}
    // },
    saveAirPrtList: {
        url: `${base}/add_bonjour.lua`,
        method: "GET",
        params: {}
    },
    reqInfoCA: {
        url: `${base}/query_cert.lua`,
        method: "GET",
        params: {}
    },
    reqCaCommonName: {
        url: `${base}/cert_name.lua`,
        method: "GET",
        params: {}
    },
    creatSignalCA:{
        url: `${base}/cert_self.lua`,
        method: "GET",
        params: {}
    },
    onApplyCA: {
        url: `${base}/reqorder.lua`,
        method: "GET",
        params: {}
    },
    importCApwd: {
        url: `${base}/cgi-bin/upload_certpass.lua`,
    },
    reSetPwd: {
        url: `${base}/modify_sys_user.lua`,
        method: "GET",
        params: {},
    },
    removeUser: {
        url: `${base}/remove_user.lua`,
        method: "GET",
        params: {}
    },
    openAirPrt: {
        url: `${base}/airprint_start.lua`,
        method: "GET",
        params: {}
    },
    closeAirPrt: {
        url: `${base}/airprint_stop.lua`,
        method: "GET",
        params: {}
    },
   
}
let config = {

    transformRequest: [function (data) {
        return Qs.stringify(data);
    }],
};
let http = axios.create(config);
//reqInfo.reSetPwd.headers = { 'Content-Type': 'multipart/form-data' }

// console.log(config)
// axios(config);
// http.interceptors.request.use(function (config) {    
//     console.log(config)
//         // config.headers = { 'Content-Type': 'multipart/form-data' }

//     return config;
// }, function (err) {
//     return Promise.reject(err);
// }); 
export const getHttp = (opt) => {
    return axios.get(opt.url, { params: opt.params || {} })
}
export const postHttp = (opt) => {
    return axios.post(opt.url, { params: opt.params || {} })
}
export const Http = (opt) => {
    return http(opt).then(res => {
        if (res && res.data.code == 200) {
            var Data = opt.T ? res : res.data.data;
            var code = true;
        } else {
            // return { errMsg_flg: res.data.message || '接口报错' }
            var code = false;
            MessageBox({
                showClose: true,
                message: res.data.message || '接口报错',
                type: 'warning',
                confirmButtonText: i18n.t('确定')
            });
        };
        return { data: Data, code: code }
    })
}
console.log(this)
export const format = (time) => {
    var now = new Date(time);
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var date = now.getDate();
    if (mon < 10) {
        mon = '0' + mon;
    };
    if (date < 10) {
        date = '0' + date;
    }
    var postDate = year + '-' + mon + '-' + date;
    return postDate;
}


// export const postHttp = (url) => {
//     axios.post(opt.url, { params: opt.params||{} }).then(
//         opt.success  && opt.success(res)
//     ).catch(function (error) {
//         err && opt.err(error)
//         console.log(err)
//     });
// } 
// export const getHttp = (opt)=>{
//     axios.get(opt.url, { params: opt.params || {} }).then(res=>{ 
//             opt.success && opt.success(res)
//     }).catch(function (error) {
//         err && opt.err(error)
//         console.log(err)
//     });
// } 