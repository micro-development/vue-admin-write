import {
    moduleInfo
} from 'common/src/output'

export default [
    {
        path: '/write',
        name: '写作',
        redirect: '/write/project',
        component: moduleInfo.layout['root-layout'],
        meta: {
            hideMenu: true
        },
        children: [
            {
                path: 'project',
                name: '项目列表',
                component: () => {
                    return import('../views/project.vue')
                }
            },
            {
                path: 'project/:project_uuid',
                name: '项目详情',
                component: () => {
                    return import('../views/dashboard.vue')
                }
            },
            {
                path: 'project/:project_uuid/catalog/:catalog_uuid/:doc_uuid?',
                name: '文章详情',
                component: () => {
                    return import('../views/detail.vue')
                }
            }
        ]
    }
]
