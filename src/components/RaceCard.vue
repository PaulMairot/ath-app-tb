<script setup>
import '../style.css';

import CardHeader from '../components/cardHeader.vue';

const props = defineProps({
  card_title: String,
  title: String,
  meeting: String,
  time: String,
  link: String,
  link_text: String
})


</script>

<template>
    <div id="container">
        <CardHeader v-if="card_title" :title="card_title"></CardHeader>

        <div class="title">
            <img class="icon accent" src="../assets/icons/shoe.svg">
            <p class="accent">{{ title }}</p>
        </div>

        <div class="infos">
            <div class="info">
                <img class="icon" src="../assets/icons/trophy.svg">
                <p>{{ meeting }}</p>
            </div>
            <a v-if="link && link_text" :href='link'>
                <p>{{ link_text }}</p>
                <img class="link_icon" src="../assets/icons/arrow_right.svg">
            </a>
            <div class="info" v-else-if="!link && time">
                <img class="icon" src="../assets/icons/time.svg">
                <p>{{ time }}</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        
        border-radius: 8px;
        box-shadow: var(--shadow);

        min-width: 270px;
        max-width: 370px;

        padding: 10px 20px 10px 20px;

        display: flex;
        flex-direction: column;
    }

    .title {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        margin-bottom: 5px;
    }

    .infos {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .infos > * {
        margin: 0;
    }

    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    p.accent {
        color: var(--accent);
        font-family: Satoshi-Medium;
        font-size: 18px;
        margin: 0;
    }

    a {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        max-height: 28px;
    }

    .infos p {
        margin: 0;
    }
    

    .icon {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        filter: var(--text_filter);
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .link_icon {
        width: 16px;
        height: 16px;
        margin-left: 8px;
        filter: var(--text_filter);
    }

    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }
    
</style>
