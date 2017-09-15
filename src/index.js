import MarkdownEditor from './components/MarkdownEditor.vue'

export default {
    install(Vue) {
        Vue.component('markdown-editor', MarkdownEditor);
    },
};

export { MarkdownEditor };
