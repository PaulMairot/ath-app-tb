<script setup>
import '../style.css';
import Info from '../components/Info.vue';

const props = defineProps({
  title: String,
  date: String,
  time: String,
  location: String,
  city: String,
  condition: String,
  temperature: String,
  wind: String
})

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

</script>

<template>
    <div id="container">
        <div class="title">
            <Info :text='title' icon="trophy.svg" :accent=true></Info>
        </div>
        <div class="infos">
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
        padding: 25px 20px 10px 20px;
        border-radius: 8px;
        max-width: 330px;
        box-shadow: var(--shadow);

        margin-bottom: 10px;
    }

    .title {
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-grow: 1;
    }

</style>
