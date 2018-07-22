<template>
    <div class="dropdown">
        <div class="dropdown__header" @click="open = !open">{{ items[active] }} ▾</div>
        <div class="dropdown__content" :style="`transform: translateY(${open ? '0' : '-50%'}) scaleY(${open ? 1 : 0})`">
            <span class="dropdown__item" @click="active = key; open = false; $emit('change', key)" v-for="val, key in items" :key="key">{{val}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
           return {
               active: Object.keys(this.items)[0],
               open: false
           }
        },
        props: {
            items: {
                type: Object,
                default: {}
            }
        }
    }
</script>
