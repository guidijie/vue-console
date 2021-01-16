// 配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// 1.通过Vue.use(插件), 安装插件
Vue.use(VueRouter)


// 2.创建VueRouter对象
const routes = [
    {
        path: '/',
        redirect: '/aaa'
    },
    {
        path: '/',
        name:'index',
        meta:{
            role:"Admin",
            title: "页面1"
        },
        component: () => import('../components/Index'),/* webpackChunkName: "index" */
        children: [
            {
                path: '/aaa',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/aaa'),
                meta: { title: '页面1' }
            },
            {
                path: '/bbb',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/bbb'),
                meta: { title: '页面2' }
            },
            {
                path: '/ccc',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/ccc'),
                meta: { title: '页面3' }
            },
            {
                path: "/404",
                name: "notFound",
                component: () => import('../components/error/404'),/* webpackChunkName: "index" */
            },
            // {
            //     path: '*',
            //     redirect: '/404'
            // }
        ]
    },
    {
        path: '/login',
        name:'login',
        meta: { title: 'login' },
        component: () => import('../components/Login'),/* webpackChunkName: "index" */
    }
]
const router = new VueRouter({
    // 配置路由和组件之间的应用关系
    routes,
    mode: 'history',
    linkActiveClass: 'active'
})

// 3.将router对象传入到Vue实例
export default router
