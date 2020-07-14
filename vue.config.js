/**
 * @author yaimeet
 * @date 2019/11/13
 * @Description
 */
const webpack = require('./src/base-resource/it-admin-common/webpack')

// console.log('write module vue.config.js webpack', webpack)

module.exports = webpack.init({
    sgPage: {
        title: '-文档云'
    },
    port: 8004,
    alias: {
        common: webpack.resolve('../it-admin-common'),
        basic: webpack.resolve('../it-admin-basic')
    }
}).setProxyApi(webpack.resolve('../../../proxyTarget.js')).setProxyList().run()
