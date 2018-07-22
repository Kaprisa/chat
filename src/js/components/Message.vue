<template>
    <div class="message__box">
        <div :class="`message message--${message.sender === this.$auth.user.email ? 'i' : 'other'}`">
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
