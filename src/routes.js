import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav1/Table.vue'
// import user from './views/nav1/user.vue'
import systemUpate from './views/nav1/systemUpate.vue'
import inkLine from './views/nav1/inkLine.vue'
import printHead from './views/nav1/printHead.vue'
import AirPrint from './views/nav1/AirPrint.vue'
import pwdSet from './views/nav1/pwdSet.vue'
import optionCA from './views/childPage/optionCA.vue'


let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        redirect: '/systemUpate',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/systemUpate', component: systemUpate, name: 'Firmware Update' },
            { path: '/inkLine', component: inkLine, name: 'Ink Status' },
            { path: '/printHead', component: printHead, name: 'Cartridge Status' },
            { path: '/AirPrint', component: AirPrint, name: 'AirPrint™' },
            {
                path: '/table/:name',
                url: '/table/main',
                component: Table,
                name: 'Printing Protocol Management',
                children: [
                    { path: '/table/optionCA/:name', component: optionCA, name: '证书配置相关操作' },
                ]
            },
            { path: '/pwdSet', component: pwdSet, name: 'Password Setting' },
            //-------三级页---
            // { path: '/form', component: Form, name: 'Form' },           
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    // {
    //     path: '/systemUpate',
    //     component: systemUpate,
    //     name: '固件更新',
    // },
    // {
    //     path: '/inkLine',
    //     component: inkLine,
    //     name: '墨水瓶状态',
    // },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
];

export default routes;