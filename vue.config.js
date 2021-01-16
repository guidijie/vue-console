module.exports = {
    publicPath: './',
    assetsDir: 'static',
    // 是否为生产环境构建生成 source map
    productionSourceMap: false,
    lintOnSave: false, // 关闭ESLint编译
    devServer: {
        //主机地址
        host:'www.jie.com',
        //启动服务自动打开浏览器
        open:true,
        //端口号
        port:80,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                    // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
                }
            }
        }

    }
}
