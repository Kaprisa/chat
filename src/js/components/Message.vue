<template>
    <div class="message__box">
        <div :class="`message message--${message.from_id === $auth.user.id ? 'i' : 'other'}`">
            {{message.text}}
            <span class="message__time">
                {{message.created_at && moment(message.created_at).format(`${(new Date(message.created_at)).day === Date.now().day ? '' : 'MM/DD/YYYY, '}h:mm a`)}}
            </span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                moment
            }
        },
        props: {
            message: Object
        }
    }
</script>
