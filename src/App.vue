<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import Race from './pages/Race.vue';

const routes = {
  '/': Home,
  '/race': Race
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  console.log(currentPath.value);
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped>

</style>
