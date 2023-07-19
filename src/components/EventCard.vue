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
    <a :href="link" id="container">
        <div class="title">
            <Info :text='title' icon="trophy.svg" :accent=true></Info>
        </div>
        <div class="infos">
            <Info :text='city' icon="city.svg"></Info>
            <Info :text='date' icon="calendar.svg"></Info>
        </div>
    </a>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 25px 20px 10px 20px;
        border-radius: 8px;
        max-width: 370px;
        box-shadow: var(--shadow);
        display: flex;
        flex-direction: column;
        align-items: center
    }

    .title {
        margin-bottom: 5px;
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }

    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }

</style>
