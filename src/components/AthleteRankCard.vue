<script setup>
import '../style.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";

import Info from '../components/Info.vue';

const props = defineProps({
  lastName: String,
  firstName: String,
  nationality: String,
  time: String,
  rank: Number,
  mentions: Array
})

/* function getRankIcon() {
  // This path must be correct for your file
  return new URL(`../assets/icons/number_${props.rank}.svg`, import.meta.url)
} */

function capitalizeFirstLetters(str) {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}

function capitalizeWord(str) {
    return str.toUpperCase();
}

function getRankIcon(rank, mention) {
    if(!isNaN(rank) && !isNaN(parseFloat(rank))) {
        return new URL(`../assets/icons/number_${rank}.svg`, import.meta.url)
    } else {
        mention = mention[0].toLowerCase();
        return new URL(`../assets/icons/${mention}.svg`, import.meta.url)
    }
}


</script>

<template>
    <div id="container">
        <div class="rank">
            <img :src="getRankIcon(rank, mentions)">
        </div>
        <div class="athlete_infos">
            <div class="row">
                <h2>{{ capitalizeWord(lastName) + " " + capitalizeFirstLetters(firstName)}}</h2>
            </div>
            <div class="row">
                <Info v-if="time" class="infoComponent" :text='time' icon="chrono.svg" :accent='true'></Info>
                <p v-for="mention in props.mentions">{{ mention }}</p>
                <span :class="'fi fi-' + nationality.toLowerCase()"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 8px;
        border-radius: 8px;
        max-width: 370px;
        box-shadow: var(--shadow);

        margin-bottom: 10px;

        display: flex;
    }

    .rank {
        width: 50px;
        height: 50px;
        margin: 0 12px 0 0;
        filter: var(--text_filter);
    }

    .row {
        max-height: 27px;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .row > .infoComponent {
        margin: 0 !important;
    }

    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }




</style>
