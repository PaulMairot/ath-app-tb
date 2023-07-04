<script setup>
import '../style.css';

const props = defineProps({
  title: String,
  time: String,
  link: String,
  link_text: String
})

</script>

<template>
    <div id="info_container">

        <div class="title">
            <img class="icon accent" src="../assets/icons/shoe.svg">
            <p class="accent">{{ title }}</p>
        </div>

        <div class="infos">
            <a v-if="link" :href='link'>
                <p>{{ link_text }}</p>
                <img class="link_icon" src="../assets/icons/arrow_right.svg">
            </a>
            <div class="infos" v-else>
                <img class="icon" src="../assets/icons/time.svg">
                <p>{{ time }}</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
    #info_container {
        background-color: var(--primary);
        
        border-radius: 8px;
        box-shadow: var(--shadow);

        max-width: 330px;

        padding: 25px 40px 10px 40px;
        margin-bottom: 10px;

        display: flex;
        flex-direction: column;
    }

    .title {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        margin-bottom: 15px;
    }

    .infos {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .infos > * {
        margin: 0;
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
    
</style>
