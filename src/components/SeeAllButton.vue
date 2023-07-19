<script setup>
import '../style.css';

const props = defineProps({
    link: String
})
</script>

<template>
    <a :href="link">
        <p>See all</p>
        <img class="icon" src='../assets/icons/arrow_right.svg'>
    </a>
</template>

<style scoped>

    a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    p {
        width: max-content;
        color: var(--option);
        font-size: 16px;
    }

    .icon {
        width: 16px;
        height: 16px;
        filter: var(--text_filter);
    }

</style>
