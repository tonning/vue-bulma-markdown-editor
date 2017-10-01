# Vue Bulma Markdown Editor
A Vue and Bulma specific package for adding a markdown editor with preview.

### Installation
Pull it in to your package.json file

```
npm install vue-bulma-markdown-editor --save
```

or

```
yarn add vue-bulma-markdown-editor
```

### Usage
```
import { MarkdownEditor } from 'vue-bulma-markdown-editor'
Vue.component('markdown-editor', MarkdownEditor)
```

#### Props
| name | type | required | default | description |
| :--- | ---- | ---------| ------- | ----------- |
| name | `String` | `true` | `null` | The name of the textarea |
| content | `String` | `false` | `''` | Defatult content |
| autosave | `Boolean` | `false` | `false` | If it should autosave |
| autosaveUrl | `String` | `false` | `null` | The url endpoint to autosave |
| autosaveMethod | `String` | `false` | `patch` | The rest verb for submitting the request |
| options | `Object` | `false` | `{ html: true, linkify: true, breaks: true }` | Options to pass to `markdown-it`. See more at [markdown-it documentation](https://github.com/markdown-it/markdown-it)

