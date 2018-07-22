<template>
    <div class="sidebar" :style="`transform: scaleX(${open ? 1 : 0})`">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                open: true
            }
        },
        props: {
            side: {
                type: String,
                default: 'left'
            }
        }
    }
</script>
