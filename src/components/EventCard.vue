<script setup>
import '../style.css';
import Info from '../components/Info.vue';

const props = defineProps({
  title: String,
  city: String,
  date: String,
  link: String
})

</script>

<template>
    <div id="container">
        <div class="title">
            <Info :text='title' icon="trophy.svg" :accent=true></Info>
        </div>
        <div class="infos">
            <Info :text='city' icon="city.svg"></Info>
            <Info :text='date' icon="calendar.svg"></Info>
        </div>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 25px 40px 10px 40px;
        border-radius: 8px;
        max-width: 330px;
        box-shadow: var(--shadow);

        margin-bottom: 10px;
    }

    .title {
        margin-bottom: 15px;
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

</style>
