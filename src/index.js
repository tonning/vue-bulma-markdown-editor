import MarkdownEditor from './components/MarkdownEditor'

export default {
    install(Vue) {
        Vue.component('markdown-editor', MarkdownEditor);
    },
};

export { MarkdownEditor };
