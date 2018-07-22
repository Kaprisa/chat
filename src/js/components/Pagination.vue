<template>
    <div class="pagination">
        <span class="pagination__item" @click="handleClick(active === 1 ? items : active - 1)">
            <
        </span>
        <span @click="handleClick(i)" :class="`pagination__item ${i === active && 'pagination__item_active'}`" v-for="i in items" :key="i">{{i}}</span>
        <span class="pagination__item" @click="handleClick(active === items ? 1 : active + 1)">
            >
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 1
            }
        },
        props: {
            items: Number
        },
        methods: {
            handleClick(index) {
                this.active = index
                this.$emit('change-active', index)
            }
        }
    }
</script>
