<template>
    <div class="editor">
        <textarea
                ref="textarea"
                class="editor__box"
                style="resize: none"
                v-model="value"
                @keydown.enter.prevent="send"
        ></textarea>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               value: null,
               minHeight: 50
            }
        },
        mounted() {
            this.resize()
        },
        methods: {
            resize: function () {
                this.$refs.textarea.style.setProperty('height', 'auto')
                let contentHeight = this.$refs.textarea.scrollHeight + 1
                if (this.minHeight) {
                    contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight
                }
                if (this.maxHeight) {
                    if (contentHeight > this.maxHeight) {
                        contentHeight = this.maxHeight
                        this.maxHeightScroll = true
                    } else {
                        this.maxHeightScroll = false
                    }
                }
                const heightVal = contentHeight + 'px'
                this.$refs.textarea.style.setProperty('height', heightVal)
                return this
            },
            send() {
                this.$emit('send', this.value)
                this.$refs.textarea.value = ''
            }
        },
        watch: {
            value (value) {
                this.$nextTick(this.resize)
            }
        }
    }
</script>
