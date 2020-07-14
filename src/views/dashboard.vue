<template>
    <component-container
            @onAddNode="onAddNode"
            @onUpdateNode="onUpdateNode"
            @onDeleteNode="onDeleteNode"
            @onNodeClick="onNodeClick"
            @onAdd="onAdd"
            :catalog="catalog"
            :list-table="listTable"
            ref="componentContainer">
        <it-add-catalog
            slot="dialog"
            :native="native"
            :configs="configs"
            :form="form"
            @onSure="onSure"
            @oncancel="onCancel"></it-add-catalog>
    </component-container>
</template>

<script>
    import * as catalogApi from '../service/catalog'
    import * as docApi from '../service/doc'
    export default {
        name: 'project-dashboard',
        components: { },
        data () {
            return {
                catalog: {
                    list: []
                },
                dataList: [],
                p_uuid: '',
                uuid: '',
                native: {
                    title: '新增',
                    visible: false
                },
                configs: {
                    event: 'add'
                },
                form: {
                    label: '子目录名称',
                    name: ''
                },
                listTable: {
                    dataList: [],
                    fieldList: [
                        {
                            label: '文档名称',
                            prop: 'title'
                        }
                    ],
                    btnList: [
                        {
                            name: '修改',
                            event: 'update',
                            method: 'onUpdate',
                            condition () {
                                return true
                            }
                        },
                        {
                            name: '查看',
                            event: 'select',
                            method: 'onSelect',
                            condition () {
                                return true
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            /**
             * URL上的project的uuid
             * @returns {*|string|number}
             */
            projectUuid () {
                return this.$route.params.project_uuid
            }
        },
        mounted () {
            // this.onAdd()
            this.init()
        },
        methods: {
            async init () {
                await this.getCatalogList()
                await this.getDocList()
            },
            /**
             * 点击左侧目录树
             * @param opts 当前节点的相关数据
             */
            async onNodeClick (opts) {
                this.uuid = opts.uuid
                this.p_uuid = opts.p_uuid
                this.$log.echo(opts, '点击左侧目录onNodeClick', 'log')
                await this.getDocList()
            },
            /**
             *  点击左侧目录右键菜单 添加 修改时调弹框时，初始化弹框数据
             *  @param opts
             *  @param method 添加，修改 add update
             */
            initDialogData (opts, method) {
                this.p_uuid = opts.curNode.data.p_uuid
                this.uuid = opts.curNode.data.uuid
                this.native = {
                    title: '',
                    visible: true
                }
                this.configs = {
                    event: method
                }
                this.form = {
                    label: '子目录名称',
                    name: ''
                }
                if (method === 'add') {
                    this.native.title = `新增(上一级目录名称：${opts.curNode.data.name})`
                } else if (method === 'update') {
                    this.native.title = `修改(目录名称：${opts.curNode.data.name})`
                    this.form = {
                        label: '目录名称',
                        name: `${opts.curNode.data.name}`
                    }
                }
            },
            /**
             * 左侧目录右键菜单 添加
             * @param opts
             */
            onAddNode (opts) {
                this.$log.echo(opts, '左侧目录右键菜单->添加', 'log')
                this.initDialogData(opts, 'add')
                this.$log.echo(this.p_uuid, '左侧目录右键菜单->添加aaa', 'log')
            },
            /**
             * 左侧目录右键菜单 修改
             * @param opts
             */
            onUpdateNode (opts) {
                this.$log.echo(opts, '左侧目录右键菜单->修改', 'log')
                this.initDialogData(opts, 'update')
            },
            /**
             * 左侧目录右键菜单 删除
             * @param opts
             */
            onDeleteNode (opts) {
                this.uuid = opts.curNode.data.uuid
                this.$log.echo(opts, '左侧目录右键菜单->删除', 'log')
                this.$confirm('确认删除吗？', '删除', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(async () => {
                    const data = await this.$http.fetch(catalogApi.remove({
                        project_uuid: this.projectUuid,
                        uuid: this.uuid
                    }))
                    // 下面应该会报错，但是浏览器控制台没有报错信息
                    // const aaa = undefined
                    // console.log(aaa.ss, 222)
                    // console.log(data, 1111)
                    if (data.code === 0) {
                        this.$message.info(data.msg)
                        this.getCatalogList()
                    }
                }).catch(() => {
                    // this.$message.info('')
                })
            },
            /**
             * 左侧目录列表
             */
            async getCatalogList () {
                const data = await this.$http.fetch(catalogApi.list({
                    projectUuid: this.projectUuid
                }))
                if (data) {
                    this.catalog.list = this.Util.listToTree(data.list, '-1')
                    this.uuid = this.catalog.list[0].uuid
                    this.$log.echo(this.catalog.list, 'getCatalogList data.list', 'log')
                }
            },
            /**
             * 文件列表
             */
            async getDocList () {
                const data = await this.$http.fetch(docApi.list({
                    catalog_uuid: this.uuid
                }))
                if (data) {
                    this.$log.echo(data, 'getDocList data.list', 'log')
                    this.listTable.dataList = data.list
                }
            },
            /**
             * 新增文档按钮
             */
            async onAdd () {
                this.$router.push({
                    path: `/write/project/${this.projectUuid}/catalog/${this.uuid}`
                })
            },
            /**
             * 左侧目录右键增删改弹框 取消按钮
             */
            onCancel () {
                this.$message.info('点击取消按钮')
            },
            /**
             * 左侧目录右键增删改弹框 确认按钮
             */
            async onSure () {
                let data
                if (this.configs.event === 'add') {
                    data = await this.$http.fetch(catalogApi.add({
                        project_uuid: this.projectUuid,
                        p_uuid: this.uuid,
                        name: this.form.name
                    }))
                } else if (this.configs.event === 'update') {
                    data = await this.$http.fetch(catalogApi.update({
                        project_uuid: this.projectUuid,
                        uuid: this.uuid,
                        name: this.form.name
                    }))
                }
                this.$log.echo(data, '添加', 'log')
                if (data.code === 0) {
                    this.$message.info(data.msg)
                    this.native.visible = false
                    this.getCatalogList()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .project-item-col{
        padding: 5px;
    }
    .project-desc{
        line-height: 32px;
        height: 72px;
    }
    .card-footer{
        /*border-top: 1px solid #EBEEF5;*/
        padding-top: 10px;
    }
    .box-card{
        cursor: pointer;
    }
    .project-type{
        &.p-mg{
            margin-top: 20px;
        }
    }
</style>
