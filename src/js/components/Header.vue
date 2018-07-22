<template>
    <div class="header">
        <template v-if="contact">
            <img :src="contact.image ? `/images/${contact.image}` : '/images/person.jpeg'" class="header__image">
            <span class="header__name">{{contact.name}}</span>
            <span class="header__last-seen">{{ contact.online ? 'ONLINE' : (contact.last_seen ? `last seen ${moment(contact.last_seen).minutes()}` : '')}}</span>
        </template>
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
            contact: Object
        }
    }
</script>
