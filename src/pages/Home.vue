<script setup>
import EventCard from '../components/EventCard.vue';
import RaceCard from '../components/RaceCard.vue';
import PageHeader from '../components/PageHeader.vue';


</script>

<template>
    <PageHeader title="Home" :back_button='true'></PageHeader>

    <RaceCard title="100m MEN" link="#/race" link_text="See results"></RaceCard>
    <RaceCard title="400m WOMEN" time="Start at 18:40"></RaceCard>
    <EventCard title="Wanda Diamond League" city="Rabat (MAR)" date="28 MAY 2023"></EventCard>
</template>

<style scoped>

</style>