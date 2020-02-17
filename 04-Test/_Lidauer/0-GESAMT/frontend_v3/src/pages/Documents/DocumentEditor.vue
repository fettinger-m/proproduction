
<template>
    <div class="editor">
        <!-- Editing Bar-->
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">

            <div class="menubar">
                <!-- Button Bold -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'bold']"/>
                </b-button>
                <!-- Button Italic -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'italic']"/>
                </b-button>
                <!-- Button Strike -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'strikethrough']"/>
                </b-button>
                <!-- Button Underline -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'underline']"/>
                </b-button>
                <!-- Button Paragraph-->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.paragraph() }"
                        @click="commands.paragraph"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'paragraph']"/>
                </b-button>
                <!-- Button Heading 1 -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                        variant="outline"
                >
                    H1
                </b-button>
                <!-- Button Heading 2 -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                        variant="outline"
                >
                    H2
                </b-button>
                <!-- Button Heading 3 -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                        variant="outline"
                >
                    H3
                </b-button>
                <!-- Button Bullet List -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'list-ul']"/>
                </b-button>
                <!-- Button Heading Ordered List -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'list-ol']"/>
                </b-button>
                <!-- TODO Button Button Blockquote -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'quote-right']"/>
                </b-button>
                <!-- TODO Button Checklist -->
                <b-button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.todo_list() }"
                        @click="commands.todo_list"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'tasks']"/>
                </b-button>
                <!-- Button Horizontal line -->
                <b-button
                        class="menubar__button"
                        @click="commands.horizontal_rule"
                        variant="outline"
                >
                    _
                </b-button>
                <!-- Button Undo -->
                <b-button
                        class="menubar__button"
                        @click="commands.undo"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'undo']"/>
                </b-button>
                <!-- Button Redo -->
                <b-button
                        class="menubar__button"
                        @click="commands.redo"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'redo']"/>
                </b-button>
            </div>
        </editor-menu-bar>

        <!-- Writing Field -->
        <editor-content class="editor__content" :editor="editor"/>

    </div>
</template>

<script>
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
    import {
        Blockquote, HardBreak, Heading, HorizontalRule, OrderedList, BulletList, ListItem, TodoItem,
        TodoList, Bold, Italic, Link, Strike, Underline, History,
    } from 'tiptap-extensions'
    import { Placeholder } from 'tiptap-extensions'
    import Doc from './Doc'
    import Title from './Title'


    export default {
        components: {
            EditorContent,
            EditorMenuBar,
        },
        methods: {

        },
        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new HardBreak(),
                        new Heading({levels: [1, 2, 3]}),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem({
                            nested: true,
                        }),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History(),
                        new Doc(),
                        new Title(),
                        new Placeholder({
                            showOnlyCurrent: false,
                            emptyNodeText: node => {
                                if (node.type.name === 'title') {
                                    return 'Give me a headline'
                                }
                                return 'Write something'
                            },
                        }),
                    ],
                    content: ``,
                    onUpdate: ({getJSON, getHTML}) => {
                        this.json = getJSON()
                        this.html = getHTML()
                    },
                }),

                json: 'Update to see changes',
                //TODO: update this to firebase
                html: 'Update to see changes',

                //TODO: get this from vuex
                mytext : '<h1>This is my Headline</h1><p>Bla bla text</p>'
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
        created(){
            //Fill Content with saved text
            this.editor.setContent( this.mytext )
        }
    }
</script>

<style lang="scss">
    .menubar__button {
        color: #777777;
    }
    .editor__content {
        padding: 30px;
        text-align: left;
        box-shadow: 3px 6px 17px 2px rgba(0,0,0,0.34);
    }

    .editor *.is-empty:nth-child(1)::before,
    .editor *.is-empty:nth-child(2)::before {
        content: attr(data-empty-text);
        float: left;
        color: #aaa;
        pointer-events: none;
        height: 0;
        font-style: italic;
    }
</style>