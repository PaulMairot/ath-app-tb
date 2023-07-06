<script setup>
import PageHeader from '../components/PageHeader.vue';
import athleteRankCard from '../components/athleteRankCard.vue';

const props = defineProps({
  live: Boolean
})


</script>

<template>
  <PageHeader title="Race" :back_button='true' :live='true'></PageHeader>
  
  <athleteRankCard lastName="Osman" firstName="ashraf hussen" nationality="JM" time="14.15" rank="7" mention="SB"></athleteRankCard>
</template>

<style scoped>
  
</style>
