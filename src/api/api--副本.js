import axios from 'axios';
import Qs from 'qs';
// import config from './config';

// let base = '/api';
let base = 'https://192.168.203.214';

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
        url: `${base}printHead`,
        method: "GET",
        params: {}
    },
    creatSignalCA: {
        url: `${base}/inkLine`,
        method: "GET",
        params: {}
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
        if (res && res.data.code == 200) return res.data.data
        else alert(res.data.message || '接口报错');
    })
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