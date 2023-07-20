module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://osoperate.dfinfo.net.cn:80/api',//这里填入你要请求的接口的前缀
          ws:true,//代理websocked
          changeOrigin:true,//虚拟的站点需要更管origin
          pathRewrite:{
            '^/api':''//重写路径
          },
        }
      }
    }
    
  }