<template>
    <div v-html="rendered"></div>
</template>

<script>
    import MarkdownIt from 'markdown-it'

    export default {
        computed: {
            rendered() {
                let md = new MarkdownIt()

                return md.render(this.content)
            }
        },

        props: {
            content: {
                required: true,
                type: String,
            }
        }
    }
</script>
