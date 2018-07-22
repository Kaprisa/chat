<template>
    <div class="header">
        <template v-if="contact">
            <span class="header__name">{{contact.name}}</span>
            <span class="header__last-seen">last seen 4 hours ago</span>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            contact: Object
        }
    }
</script>
