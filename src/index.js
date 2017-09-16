import MarkdownEditor from './components/MarkdownEditor.vue'

module.exports = {
    install: function (Vue, options) {
        Vue.component('markdown-editor', MarkdownEditor);
    }
};
