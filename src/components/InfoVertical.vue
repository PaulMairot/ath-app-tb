<script setup>
import '../style.css';

const props = defineProps({
  text: [String, Number],
  icon: String,
  legend: String,
  accent: Boolean
})

/**
 * Get url to SVG file of information icon 
 */
function getIconUrl() {
  return new URL(`../assets/icons/${props.icon}`, import.meta.url)
}

/**
 * Check if a string referes to a SVG file
 * @param str - String to check
 */
function isIcon(str) {
    return str.substring(str.length, str.length-4) === '.svg'
}

</script>

<template>
    <div id="info_container" :class="{ primary: accent }">
        <img v-if="icon && isIcon(icon)" class="icon" :src="getIconUrl()">
        <span v-if="icon && !isIcon(icon)" :class="'fi fi-' + icon.toLowerCase()"></span>
        
        <Transition name="slide-fade" mode="out-in">
            <p v-if="text" :key="text" class="text" :class="text.length > 12 ? 'longInfo' : ''">{{ text }}</p>
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

p.text {
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

p.longInfo.text:hover {
    cursor: default;
    overflow: visible;
    overflow-wrap: break-word;
    white-space:normal;
    text-align: center;
    position: absolute;
    background-color: var(--primary);
    box-shadow: var(--shadow);
    padding: 5px;
    
    border-radius: 8px;
    width: 100px;
    height: 75px;
}

#info_container.primary > p:nth-of-type(1){
    font-family: Satoshi-Bold;
    color: var(--accent);
}

p.legend {
    color: var(--option);
    font-size: 14px;
}

.fi {

    width: 25px;
    height: 25px;
    line-height: 1.5em;
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
