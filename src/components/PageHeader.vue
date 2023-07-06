<script setup>
import '../style.css';

const props = defineProps({
  title: String,
  back_button: Boolean,
  live: Boolean
})

function goBack() {
    window.history.back();
}

</script>

<template>
    <div id="container">
        <a :class="back_button ? 'visible' : 'hidden'">
            <img @click="goBack()" id="back_button" src="../assets/icons/arrow_left.svg">
        </a>
        <h1>{{ title }}</h1>
        <img :class="live ? 'visible' : 'hidden'" id="live_indicator" src="../assets/icons/live.svg">
    </div>
    
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    margin: 20px auto 30px auto;
}

h1 {
    margin: 0;
}

a {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    max-height: 28px;
}

.hidden {
    display: none;
}

#back_button {
    width: 28px;
    height: 28px;
    filter: var(--text_filter);
}

#live_indicator {
    width: 32px;
    height: 32px;
    filter: var(--accent_filter);
  }

@media (max-width: 600px) {

    #container {
        justify-content: space-between;
        padding: 0 2px;
    }

    #back_button {
        margin: 0;
    }
}
</style>