<template>
    <div class="app">
        <transition name="slide-fade">
            <router-view :key="$route.path" />
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>
