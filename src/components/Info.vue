<script setup>
import '../style.css';

const props = defineProps({
  text: String,
  icon: String,
  accent: Boolean,
  link: String
})

function getIconUrl() {
  // This path must be correct for your file
  return new URL(`../assets/icons/${props.icon}`, import.meta.url)
}

</script>

<template>
    <div id="info_container" :class="{ primary: accent }">
        <img v-if="icon" class="icon" :src="getIconUrl()">
        <p>{{ text }}</p>

    </div>
</template>

<style scoped>
    #info_container {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        margin-bottom: 10px;
    }


    #info_container > p {
        margin: 0;
        color: var(--text);
    }

    #info_container.primary > p{
        color: var(--accent);
        font-family: Satoshi-Medium;
        font-size: 18px;
    }

    a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        max-height: 27px;
    }
    

    .icon {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        filter: var(--text_filter);
    }

    #info_container.primary > .icon{
        filter: var(--accent_filter)
    }

    .link_icon {
        width: 16px;
        height: 16px;
        margin-left: 8px;
        filter: var(--text_filter);
    }
    
</style>
