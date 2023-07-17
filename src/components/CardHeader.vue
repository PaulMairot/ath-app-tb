<script setup>
import '../style.css';

const props = defineProps({
  title: String,
  live: Boolean
})

</script>

<template>
    <div class="header">
        <h2>{{ title }}</h2>
        <img :class="live ? 'visible' : 'hidden'" id="live_indicator" src="../assets/icons/live.svg">
    </div>
</template>

<style scoped>

.header {
    display: flex;
}

h2 {
    width: 100%;
    margin: 0 0 15px 0;
}

#live_indicator {
    width: 32px;
    height: 32px;
    filter: var(--accent_filter);
}

.hidden {
    display: none;
}

@media (max-width: 600px) {

    #container > :nth-child(1) {
        flex: 0.5;
        justify-content: start;

    }
}
</style>