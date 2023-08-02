<script setup>
import '../style.css';
import Info from '../components/Info.vue';
import CardHeader from './CardHeader.vue';

import { formatTime, capitalizeFirstLetter } from '../services/Formating.js'

const props = defineProps({
  title: String,
  meeting: String,
  date: String,
  time: String,
  location: String,
  city: String,
  conditions: String,
  temperature: Number,
  wind: Number
})


</script>

<template>
    <div id="container">
        <CardHeader title="Race informations"></CardHeader>
        <div class="title">
            <Info v-if="title" :text='title' icon="shoe.svg" :accent=true></Info>
            <Info :text='meeting' icon="trophy.svg" :accent="title?false:true"></Info>
        </div>
        <div class="infos" v-if="!title">
            <div class="col">
                <Info v-if="date" :text='date' icon="calendar.svg"></Info>
                <Info v-if="location" :text='location' icon="location.svg"></Info>
                <Info v-if="temperature" :text="temperature + '°C ' + capitalizeFirstLetter(conditions)" :icon="conditions + '.svg'"></Info>
            </div>
            <div class="col">
                <Info v-if="time" :text='formatTime(time)' icon="time.svg"></Info>
                <Info v-if="city" :text='city' icon="city.svg"></Info>
                <Info v-if="wind" :text="wind + ' km/h'" icon="wind.svg"></Info>
            </div>            
        </div>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 10px 20px;
        border-radius: 8px;
        max-width: 370px;
        box-shadow: var(--shadow);
    }

    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5px;
    }


    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        justify-content:space-evenly;
        flex-grow: 1;
        gap: 8px;
        align-content: center;
    }

    @media (max-width: 600px) {
    #container {
        max-width: 100%;
    }
}

</style>
