<template>
    <textarea @input="onChange" :name="name" :class="classes" v-html="content"></textarea>
</template>

<script>
    import autosize from 'autosize'

    export default {
        mounted() {
            autosize(this.$el)
        },

        props: ['classes', 'onChange', 'content', 'name'],
    }
</script>
