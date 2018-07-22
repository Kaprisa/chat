<template>
    <div class="message__box">
        <div :class="`message message--${message.sender === 'i' ? 'i' : 'other'}`">
            {{message.text}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            message: Object
        }
    }
</script>
