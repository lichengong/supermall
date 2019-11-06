module.exports={
    baseUrl: './',
    configureWebpack:{
        resolve:{
         alias: {
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
            'views':'@/views'
            }
        }
    },
    chainWebpack: config => {
        config.module
          .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
              .loader('px2rem-loader')
              .options({
                remUnit: 37.5
              })
      },
      devServer:{
        proxy:{
            'api':{
                target:'http://127.0.0.1:3000',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^api':''
                }
            }
        }
    }
}