import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/index'
import axios from "axios";

Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.withCredentials = true


// const whiteList = ['/login'] // 不重定向白名单

//使用钩子函数对路由进行权限跳转
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
    //设置网页的标题
    document.title = `${to.meta.title}`;

    let cuser = []
    Vue.prototype.$http.get("http://localhost:8080/isSession").then(data => {
        cuser = data.data.data;
        if(cuser === null){
            localStorage.clear();
        }
        console.log(cuser)
    }).catch(() => {
        localStorage.clear();
    })

    //获取用户
    let user = JSON.parse(localStorage.getItem('user'));
    //是login请求就放行
    if (to.path === '/login') {
        next();
    } else if (cuser !== null && user !== null) {
        //session中有数据了就放行
        next()
    } else {
        //不是login请求就跳回login界面
        next('/login')
    }
});

export default new Vue({
    router,
    axios,
    render: h => h(App),
}).$mount('#app')
