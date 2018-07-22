<template>
    <div class="snackbar" v-if="options.visible">
        <span class="snackbar__text">{{options.text}}</span>
        <span class="snackbar__icon" @click="$emit('change-visible')" :style="`color: ${options.error ? '#e53935' : '#64dd17'}`">{{ options.error ? '✖' : '✔︎'}}︎</span>
    </div>
</template>

<script>
    export default {
        props: {
            options: Object
        }
    }
</script>
