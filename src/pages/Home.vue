<script setup>
import PageHeader from '../components/PageHeader.vue';
import EventCard from '../components/EventCard.vue';
import RaceCard from '../components/RaceCard.vue';
import RaceCardDetailled from '../components/RaceCardDetailled.vue';

</script>

<template>
    <PageHeader title="Home" :back_button='false'></PageHeader>

    <RaceCard title="100m MEN" link="#/race" link_text="See results"></RaceCard>
    <RaceCard title="400m WOMEN" time="Start at 18:40"></RaceCard>
    <EventCard title="Wanda Diamond League" city="Rabat (MAR)" date="28 MAY 2023"></EventCard>
    
    <RaceCardDetailled 
        title="Wanda Diamond League" 
        date="5 MAY 2023"
        time="18:40"
        location="Qatar SC Stadium"
        city="Doha (QAT)"
        condition="cloudy"
        temperature="34"
        wind="+2">
    </RaceCardDetailled>
</template>

<style scoped>

</style>