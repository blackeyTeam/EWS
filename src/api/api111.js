import axios from 'axios';
import Qs from 'qs';
// import config from './config';

// let base = 'https://192.168.203.214';
let base = ''

// export const requestLogin = params => { return axios.get(`${base}/login`, { params: params}).then(res => res.data); };
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const getUserListPage = params => { return axios.get(`${base}/cgi-bin/query_user.lua`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/cgi-bin/remove_user.lua`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/cgi-bin/add_user.lua`, { params: params }); };

export const test = params => { return axios.get(`m.lvmama.com`, { params: 1 }); };

export const reqInfo={
    requestLogin:{
        url: `${base}/cgi-bin/auth.lua`,
        // url : `${base}/login`,
        method: "GET",
        params: {}
    },
    getLatestVersion: {
        url: `${base}/cgi-bin/query_system.lua`,
        method: "GET",
        params: {}
    },
    updateVersion: {
        url: `${base}/cgi-bin/query_process.lua`,
        method: "GET",
        params: {}
    },
    upgradeUrl: {
        url: `${base}/upgradeUrl`,
        method: "GET",
        params: {}
    },
    inkLine: {
        url: `${base}/cgi-bin/ink_capacity.lua`,
        method: "GET",
        params: {}
    },
    printHead: {
        url: `${base}/cgi-bin/print_head.lua`,
        method: "GET",
        params: {}
    },
    AirptInfo: {
        url: `${base}/cgi-bin/query_bonjour.lua`,
        method: "GET",
        params: {}
    },
    AirptStatu: {
        url: `${base}/printHead`,
        method: "GET",
        params: {}
    },
    toggleAirPrt: {
        url: `${base}printHead`,
        method: "GET",
        params: {}
    },
    saveAirPrtList: {
        url: `${base}/cgi-bin/add_bonjour.lua`,
        method: "GET",
        params: {}
    },
    creatSignalCA:{
        url: `${base}/cgi-bin/cert._sels.luar`,
        method: "GET",
        params: {}
    },
    onApplyCA: {
        url: `${base}/cgi-bin/eqorder.lua`,
        method: "GET",
        params: {}
    },
    reSetPwd: {
        url: `${base}/cgi-bin/modify_sys_user.lua`,
        method: "GET",
        params: {},
    },
    removeUser: {
        url: `${base}/cgi-bin/remove_user.lua`,
        method: "GET",
        params: {}
    },
   
}
let config={

transformRequest: [function (data) {
    return  Qs.stringify(data);
  }],
};
let http = axios.create(config);
// reqInfo.reSetPwd.headers = { 'Content-Type': 'application/octet-stream' }

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
export const Http = (opt) => {return http(opt).then(res => { 
    if (res && res.data.code == 200) return res.data.data
    else alert( res.data.message||'接口报错');
})} 

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