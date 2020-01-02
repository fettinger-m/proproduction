<template>
    <div class="editor">
        <b-container>
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
                    <!-- Button Code -->
                    <b-button
                            class="menubar__button"
                            :class="{ 'is-active': isActive.code() }"
                            @click="commands.code"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'code']"/>
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
                    <!-- Button Button Blockquote -->
                    <b-button
                            class="menubar__button"
                            :class="{ 'is-active': isActive.blockquote() }"
                            @click="commands.blockquote"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'quote-right']"/>
                    </b-button>
                    <!-- Button CodeBlock -->
                    <b-button
                            class="menubar__button"
                            :class="{ 'is-active': isActive.code_block() }"
                            @click="commands.code_block"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'file-code']"/>
                    </b-button>
                    <!-- Button Horizontal Rule -->
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
        </b-container>
    </div>
</template>

<script>
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
    import {
        Blockquote, CodeBlock, HardBreak, Heading, HorizontalRule, OrderedList, BulletList, ListItem, TodoItem,
        TodoList, Bold, Code, Italic, Link, Strike, Underline, History,
    } from 'tiptap-extensions'

    export default {
        components: {
            EditorContent,
            EditorMenuBar,
        },
        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({levels: [1, 2, 3]}),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem(),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History(),
                    ],
                    content: `<p>Start writing here</p>`,
                }),
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>

<style scoped>

    .menubar__button {
        color: #777777;
    }

    .editor__content {
        border-style: solid;
        border-width: 2px;
        border-color: #777777;
    }

</style>