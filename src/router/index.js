// 注入公共模块初始化
import {
    router,
    store
} from 'common/src/output'

// 注入账户中心模块
import {
    routes as basicRoutes
} from 'basic/src/output'

// 注入当前自身模块路由
import curRoutes from './routes'

const allRoutes = [
    ...basicRoutes,
    ...curRoutes
]

// console.log('write allRoutes', allRoutes)

router.addRoutes(allRoutes)

const newRoutes = store.getters.getRoutes.concat(allRoutes)
store.commit('setRoutes', newRoutes)
