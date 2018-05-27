<template>
  <div>
    <markdown-editor v-model="contentRaw" name="contentBox"/>
    <section class="section results">
      <div class="content">
        {{ contentRaw }}
      </div>
    </section>
    <section class="section">
      <div class="content" v-html="rendered">
      </div>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { MarkdownEditor } from '../src'
  import MarkdownIt from 'markdown-it'
  Vue.component('markdown-editor', MarkdownEditor)
  export default {
    name: "App",
    data: function () {
      return {
        contentRaw: '# Something',
      }
    },
    computed: {
      rendered: function () {
        var mdRenderer = new MarkdownIt()
        return mdRenderer.render(this.contentRaw)
      }
    }
  }
</script>

<style scoped>
.results {
  margin-top: 2em;
}
</style>