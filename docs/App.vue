<template>
  <div>
    <markdown-editor :autosave-switch-visible="false"/>
    <div class="content">
      Blanlaa
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { MarkdownEditor } from '../src'
  Vue.component('markdown-editor', MarkdownEditor)
  export default {
    name: "App"
  }
</script>

<style scoped>
.content {
  margin-top: 2em;
}
</style>