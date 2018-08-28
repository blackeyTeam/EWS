import axios from 'axios';
import Qs from 'qs';
// import Vue from 'vue';
// import VueI18n from 'vue-i18n' ;
// import { MessageBox, confirm } from 'element-ui';
// Vue.use(VueI18n);
// import config from './config';
// Vue.prototype.$confirm = MessageBox.confirm;

let base = '/api';

// export const requestLogin = params => { return axios.get(`${base}/login`, { params: params}).then(res => res.data); };
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const getUserListPage = params => { return axios.get(`${base}/test`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/remove_user.lua`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/add_user.lua`, { params: params }); };


export const reqInfo = {
    requestLogin: {
        url: `${base}/login`,
        method: "GET",
        params: {}
    },
    getLatestVersion: {
        url: `${base}/checkversion`,
        method: "GET",
        params: {}
    },
    updateVersion: {
        url: `${base}/update`,
        method: "GET",
        params: {}
    },
    upgradeUrl:{
        url: `${base}/upgradeUrl`,
        method: "GET",
        params: {}
    },
    inkLine: {
        url: `${base}/inkLine`,
        method: "GET",
        params: {}
    },
    printHead: {
        url: `${base}/printHead`,
        method: "GET",
        params: {}
    },
    AirptInfo: {
        url: `${base}/AirPrint`,
        method: "GET",
        params: {}
    },
    AirptStatu: {
        url: `${base}/airStatus`,
        method: "GET",
        params: {}
    },
    // toggleAirPrt: {
    //     url: `${base}printHead`,
    //     method: "GET",
    //     params: {}
    // },
    openAirPrt: {
        url: `${base}printHead`,
        method: "GET",
        params: {}
    },
    closeAirPrt: {
        url: `${base}printHead`,
        method: "GET",
        params: {}
    },
    saveAirPrtList: {
        url: `${base}printHead`,
        method: "GET",
        params: {}
    },
    reqInfoCA: {
        url: `${base}/infoCA`,
        method: "GET",
        params: {}
    },
    reqCaCommonName: {
        url: `${base}/CommonName`,
        method: "GET",
        params: {}
    },
    creatSignalCA: {
        url: `${base}/inkLine`,
        method: "GET",
        params: {}
    },
    onApplyCA: {
        url: `${base}/inkLine`,
        method: "GET",
        params: {}
    },
    importCApwd: {
        url: `${base}/cgi-bin/upload_certpass.lua`,
    },
    reSetPwd: {
        url: `${base}/resetPwd`,
        method: "GET",
        params: {},
    },
    removeUser: {
        url: `${base}/remove_user.lua`,
        method: "GET",
        params: {}
    },

}
let config = {

    transformRequest: [function(data) {
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
            let Data = opt.T ? res : res.data.data;
            return Data
        }else {
            // alert(res.data.message || '接口报错')
            return { errMsg_flg: res.data.message || '接口报错' }
        };
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