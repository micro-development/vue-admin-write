<template>
    <component-container>
        <div slot="content">
            <el-form ref="editorMdForm" :model="formData" :rules="rules">
                <el-form-item label="文章标题">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <it-editor-md
                    ref="itEditorMd"
                    :config="config"
                    :option-list="optionList"
                    :editor-value="defaultValue"></it-editor-md>
                <div>
                    <el-button size="" type="primary" @click="onSure">确定</el-button>
                    <el-button size="" type="default">取消</el-button>
                </div>
            </el-form>
        </div>
    </component-container>
</template>

<script>
    import * as docApi from '../service/doc'
    export default {
        name: 'project-detail',
        data () {
            return {
                defaultValue: '> this is default value',
                config: {
                    toolbarMode: 'full'
                },
                optionList: {},
                formData: {
                    title: ''
                },
                rules: {}
            }
        },
        computed: {
            /**
             * URL上的project的project_uuid
             * @returns {*|string|number}
             */
            projectUuid () {
                return this.$route.params.project_uuid
            },
            /**
             * URL上的project的project_uuid
             * @returns {*|string|number}
             */
            catalogUuid () {
                return this.$route.params.catalog_uuid
            }
        },
        props: {
        },
        methods: {
            async onSure () {
                const editorMd = this.$refs.itEditorMd.editorMd
                const editorMdHtml = editorMd.getHTML()
                const editorMdContent = editorMd.getMarkdown()
                this.$log.echo(editorMd, ' editorMd', 'log')
                const data = await this.$http.fetch(docApi.add({
                    catalog_uuid: this.catalogUuid,
                    title: this.formData.title,
                    markdown_content: editorMdContent,
                    html_content: editorMdHtml,
                    permission: 1
                }))
                if (data) {
                    this.$log.echo(data, ' data', 'log')
                    this.$message.info(data.msg)
                    this.$router.push({
                        path: `/write/project/${this.projectUuid}`
                    })
                    // this.$message.info(data.msg)
                }
            }
        }
    }
</script>

<style lang="less">

</style>
