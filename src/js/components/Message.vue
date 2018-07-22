<template>
    <div class="message__box">
        <span :class="`message message--${message.sender === this.$auth.user.email ? 'i' : 'other'}`">
            {{message.text}}
        </span>
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
