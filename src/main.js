import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import routes from './routes'
import VueI18n from 'vue-i18n' //国际化显示
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueI18n);

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    //NProgress.start();
    console.log(to.path)
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})

//router.afterEach(transition => {
//NProgress.done();
//});
/*---------使用语言包-----------*/
export const i18n = new VueI18n({
    locale: sessionStorage.lang||'CN', // 语言标识
        messages: {
            'CN': require('./common/lang/cn'), // 中文语言包
            'EN': require('./common/lang/en'), // 英文语言包
        },
    })
    //在组件的template中，调用$t()方法
    //在组件的script中，调用this.$i18n.t()方法
new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    i18n,
    //components: { App }
    render: h => h(App)
}).$mount('#app')