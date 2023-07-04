<script setup>
import '../style.css';

const props = defineProps({
  title: String,
  back_button: Boolean
})

</script>

<template>
    <div id="container">
        <a v-if="back_button">
            <img id="back_button" src="../assets/icons/arrow_left.svg">
        </a>
        <h1>{{ title }}</h1>
    </div>
    
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 20px auto 50px auto;
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

#back_button {
    width: 28px;
    height: 28px;
    margin-right: 12px;
    filter: var(--text_filter);
}

@media (max-width: 600px) {

    #container > :nth-child(1) {
        flex: 0.5;
        justify-content: start;

    }
}
</style>