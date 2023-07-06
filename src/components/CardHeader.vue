<script setup>
import '../style.css';

const props = defineProps({
  title: String
})

</script>

<template>
    <h2>{{ title }}</h2>
    
</template>

<style scoped>

h2 {
    width: 100%;
    margin: 0 0 15px 0;
}

@media (max-width: 600px) {

    #container > :nth-child(1) {
        flex: 0.5;
        justify-content: start;

    }
}
</style>