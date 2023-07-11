<script setup>
import '../style.css';

const props = defineProps({
  text: String,
  icon: String,
  legend: String,
  accent: Boolean
})

function getIconUrl() {
  // This path must be correct for your file
  return new URL(`../assets/icons/${props.icon}`, import.meta.url)
}

function isCountry(str) {
    return str.length == 2
}

</script>

<template>
    <div id="info_container" :class="{ primary: accent }">
        <img v-if="icon && !isCountry(icon)" class="icon" :src="getIconUrl()">
        <span v-if="icon && isCountry(icon)" :class="'fi fi-' + icon.toLowerCase()"></span>
        
        <Transition name="slide-fade" mode="out-in">
            <p :key="text">{{ text }}</p>
        </Transition>
        <p class="legend">{{ legend }}</p>
    </div>
</template>

<style scoped>

.slide-fade-enter-active {
    transition: all .1s
}

.slide-fade-leave-active {
  transition: all .1s
}

.slide-fade-enter {
    transform: scale(1) translateY(-3px);
    opacity: 0.8;
}
.slide-fade-leave-to {
  transform: scale(0.8) translateY(3px);
  opacity: 0;
}

    #info_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        min-width: 100px;
    }


    p {
        margin: 0;
        color: var(--text);
        font-size: 18px;
        animation: slide 0.2s ease-out both;
    }

    p.legend {
        color: var(--option);
        font-size: 14px;
    }

    #info_container.primary > p{
        color: var(--accent);
    }
    

    .icon {
        width: 25px;
        height: 25px;
        filter: var(--text_filter);
        margin-bottom: 2px;
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
