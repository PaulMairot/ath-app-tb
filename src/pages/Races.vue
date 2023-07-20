<script setup>
import { onMounted, ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import CardHeader from '../components/CardHeader.vue';
import RaceCard from '../components/RaceCard.vue';
import * as RaceService from '../services/Race.js'

let races = ref([]);
let pendingRaces = ref([]);
let finishedRaces = ref([]);
let liveRaces = ref([]);

onMounted(async ()=> {
    races.value = await RaceService.getRaces();
    finishedRaces.value = races.value.filter(race => race.state == 'finished')
    pendingRaces.value = races.value.filter(race => race.state == 'pending');
    liveRaces.value = races.value.filter(race => race.state == 'live');
})
</script>

<template>

    <PageHeader title="Races" :back_button='true'></PageHeader>

    <CardHeader v-if="liveRaces.length" title="Live" :live="true"></CardHeader>
    <section v-if="liveRaces.length">
        <RaceCard v-for="race in liveRaces" 
            :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
            :meeting="race.meeting.name" 
            :link="'#/race/' + race.id" 
            :link_text="race.state == 'finished' ? 'See results' : ''">
        </RaceCard>
    </section>

    <CardHeader v-if="pendingRaces.length" title="Next races" :live="false"></CardHeader>
    <section v-if="pendingRaces.length">
        <RaceCard v-for="race in pendingRaces" 
            :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
            :meeting="race.meeting.name" 
            :link="'#/race/' + race.id" 
            :link_text="race.state == 'finished' ? 'See results' : ''">
        </RaceCard>
    </section>

    <CardHeader v-if="finishedRaces.length" title="Finished races" :live="false"></CardHeader>
        <section v-if="finishedRaces.length">
            <RaceCard v-for="race in finishedRaces" 
                :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
                :meeting="race.meeting.name" 
                :link="'#/race/' + race.id" 
                :link_text="race.state == 'finished' ? 'See results' : ''">
            </RaceCard>
        </section>
</template>

<style scoped>
section{
    display:flex;
    width:100%;
    gap: 10px;
    overflow:auto;
    padding-bottom: 15px;
    margin-bottom: 20px;
}


</style>