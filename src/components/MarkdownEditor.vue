<template>
    <div>
        <div class="tabs">
            <ul>
                <li @click="setActiveTab('content')" :class="{'is-active': activeTab == 'content'}"><a>Content</a></li>
                <li @click="setActiveTab('preview')" :class="{'is-active': activeTab == 'preview'}"><a>Preview</a></li>
                <li @click="setActiveTab('cheat-sheet')" :class="{'is-active': activeTab == 'cheat-sheet'}"><a>Cheat Sheet</a></li>
            </ul>
        </div>
        <div>
            <div v-show="activeTab == 'content'" id="markdown-editor">
                <keep-alive>
                    <autosize-textarea :name="name" :onChange="handleChange" :content="body" classes="textarea"></autosize-textarea>
                </keep-alive>

                <transition name="fade">
                    <p class="help is-pulled-left" style="padding-left: 10px;" v-show="showSaved">Last auto saved at {{ lastSavedAt }}</p>
                </transition>

                <div class="field is-pulled-right" style="min-width: 140px;" v-show="autosaveShowSwitch">
                    <input id="markdown-autosave" type="checkbox" name="markdown-autosave" class="switch is-thin" :checked="autosave" v-model="autosaveIsActive">
                    <label for="markdown-autosave" style="font-size: 0.7rem; padding-top: 0.3rem;">Autosave {{ autosaveStatusText }}</label>
                </div>
            </div>

            <div v-if="activeTab == 'preview'" id="markdown-editor-preview" class="box content" v-html="rendered"></div>

            <div v-if="activeTab == 'cheat-sheet'" id="markdown-editor-cheatsheets">
                <div class="tabs is-toggle is-fullwidth is-small">
                    <ul>
                        <li @click="setActiveCheatSheetTab('headings')" :class="{'is-active': activeCheatSheetTab == 'headings'}"><a>Headings</a></li>
                        <li @click="setActiveCheatSheetTab('emphasis')" :class="{'is-active': activeCheatSheetTab == 'emphasis'}"><a>Emphasis</a></li>
                        <li @click="setActiveCheatSheetTab('lists')" :class="{'is-active': activeCheatSheetTab == 'lists'}"><a>Lists</a></li>
                        <li @click="setActiveCheatSheetTab('links')" :class="{'is-active': activeCheatSheetTab == 'links'}"><a>Links</a></li>
                        <li @click="setActiveCheatSheetTab('images')" :class="{'is-active': activeCheatSheetTab == 'images'}"><a>Images</a></li>
                        <li @click="setActiveCheatSheetTab('blockquotes')" :class="{'is-active': activeCheatSheetTab == 'blockquotes'}"><a>Blockquotes</a></li>
                        <li @click="setActiveCheatSheetTab('horizontal_rules')" :class="{'is-active': activeCheatSheetTab == 'horizontal_rules'}"><a>Horizontal Rules</a></li>
                        <li @click="setActiveCheatSheetTab('line_breaks')" :class="{'is-active': activeCheatSheetTab == 'line_breaks'}"><a>Line Breaks</a></li>
                    </ul>
                </div>

                <div class="content">
                    <pre v-html="markdownReferences[activeCheatSheetTab]"></pre>
                    <hr>
                    <markdown :content="markdownReferences[activeCheatSheetTab]"></markdown>
                    <hr>
                    <p class="mtn20 mb20 help">Read the official <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">Daring Fireball Markdown syntax documentation</a> </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import * as MarkdownReferences from './cheatsheet.js'
    import AutosizeTextarea from './AutosizeTextarea.vue'
    import Markdown from './Markdown.vue'
    import MarkdownIt from 'markdown-it'
    import MarkdownItAttrs from 'markdown-it-attrs/markdown-it-attrs.browser.js'
    import Moment from 'moment'

    export default {
        components: {
            AutosizeTextarea,
            Markdown,
        },

        model: {
          prop: 'content',
          event: 'change'
        },

        computed: {
            autosaveStatusText() {
                return this.autosaveIsActive ? 'On' : 'Off'
            },

            rendered() {
                let md = new MarkdownIt(this.options)
                    .use(MarkdownItAttrs);

                return md.render(this.body)
            },
        },

        data() {
            return {
                activeTab: 'content',
                activeCheatSheetTab: 'headings',
                body: this.content,
                markdownReferences: MarkdownReferences,
                showSaved: false,
                autosaveShowSwitch: this.autosaveSwitchVisible,
                lastSavedAt: null,
                autosaveIsActive: this.autosave
            }
        },

        methods: {
            handleChange(e) {
                this.body = e.target.value

                this.$emit('change', this.body)

                if (this.autosaveIsActive) {
                    this.save()
                }
            },

            save: _.debounce(function() {
                if (! this.autosaveUrl) {
                    return
                }

                axios[this.autosaveMethod](this.autosaveUrl, {
                    [this.name]: this.body
                }).then(response => {
                    this.saved()
                })
            }, 1000),

            saved() {
                this.showSaved = true
                this.lastSavedAt = Moment().format("h:mm:ss a")
            },

            setActiveTab(tab) {
                this.activeTab = tab
            },

            setActiveCheatSheetTab(tab) {
                this.activeCheatSheetTab = tab
            }
        },

        props: {
            autosave: {
                default: false,
                type: Boolean,
            },

            autosaveUrl: {
                type: String,
            },

            autosaveMethod: {
                default: 'patch',
                type: String,
            },

            autosaveSwitchVisible: {
                default: true,
                type: Boolean,
            },

            content: {
                default: '',
                type: String,
            },

            name: {
                required: true,
                type: String,
            },

            options: {
                type: Object,
                default: () => {
                    return {
                        html: true,
                        linkify: true,
                        breaks: true,
                    }
                },

            },
        }
    }
</script>

<style lang="scss">
    @import "~bulma/sass/utilities/variables.sass";
    @import "~bulma-switch/switch.sass";
</style>
