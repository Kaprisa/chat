<template>
    <div :class="`contact ${active && 'contact--active'}`" @click="$emit('click')">
        <img :src="contact.image ? `/images/${contact.image}` : '/images/person.jpeg'" alt="" class="contact__img">
        <span class="contact__name">{{contact.name}}</span>
        <span class="contact__last-msg">{{contact.last_message && `${contact.last_message.from_id === $auth.user.id ? 'Вы: ' : ''}${contact.last_message.text}`}}</span>
        <span class="contact__time">{{contact.time}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            active: Boolean,
            contact: Object
        }
    }
</script>
