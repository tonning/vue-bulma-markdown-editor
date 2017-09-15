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
            <div v-show="activeTab == 'content'">
                <keep-alive>
                    <autosize-textarea :name="name" :onChange="handleChange" :content="body" classes="textarea"></autosize-textarea>
                </keep-alive>
                <transition name="fade">
                    <p class="help" v-show="showSaved">Last auto saved at {{ lastSavedAt }}</p>
                </transition>
            </div>

            <div v-if="activeTab == 'preview'" class="box content" v-html="rendered"></div>

            <div v-if="activeTab == 'cheat-sheet'">
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
    import * as MarkdownReferences from '../cheatsheets/cheatsheet'
    import AutosizeTextarea from './AutosizeTextarea.vue'
    import Markdown from './Markdown.vue'
    import MarkdownIt from 'markdown-it'
    import MarkdownItAttrs from 'markdown-it-attrs'
    import Moment from 'moment'

    export default {
        components: {
            AutosizeTextarea,
            Markdown,
        },

        computed: {
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
                lastSavedAt: null,
            }
        },

        methods: {
            handleChange(e) {
                this.body = e.target.value

                if (this.autosave) {
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
