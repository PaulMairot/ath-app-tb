<script setup>
import '../style.css';
import Info from '../components/Info.vue';
import CardHeader from './CardHeader.vue';


const props = defineProps({
  title: String,
  meeting: String,
  date: String,
  time: String,
  location: String,
  city: String,
  condition: String,
  temperature: String,
  wind: String
})

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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
                <Info :text='date' icon="calendar.svg"></Info>
                <Info :text='location' icon="location.svg"></Info>
                <Info :text="temperature + '°C ' + capitalizeFirstLetter(condition)" :icon="condition + '.svg'"></Info>
            </div>
            <div class="col">
                <Info :text='time' icon="time.svg"></Info>
                <Info :text='city' icon="calendar.svg"></Info>
                <Info :text="wind + ' km/h'" icon="wind.svg"></Info>
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

        margin-bottom: 10px;
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
        flex-wrap: wrap;
        justify-content:space-evenly;
        flex-grow: 1;
        gap: 20px;
    }

    @media (max-width: 600px) {
    #container {
        max-width: 100%;
    }
}

</style>
