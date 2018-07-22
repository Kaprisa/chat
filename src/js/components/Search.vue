<template>
    <div class="search">
        <input type="text" class="search__input" @input="e => $emit('change', e.target.value)">
        <img src="../../images/search.svg" class="search__img">
    </div>
</template>

<script>
    export default {

    }
</script>
