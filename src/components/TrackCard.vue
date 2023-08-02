<script setup>
import '../style.css';
import InfoVertical from '../components/InfoVertical.vue';
import CardHeader from './CardHeader.vue';
import Track from './Track.vue';
import { ref } from 'vue';

const props = defineProps({
  card_title: String,
  positions: Array,
  enableTrace: Boolean,
  selectedAthleteId: String
});

let trace = ref(false);
let infoSecondary = ref(false)

let positionData = ref({
    'athlete': '', 
    'rank': '', 
    'speed': '', 
    'gapToLeader': ''
});

let infos = ref([
    {
        "text": "-", 
        "icon":"podium.svg", 
        "legend":"Rank",
        "display": !infoSecondary.value
    },
    {
        "text": "-", 
        "icon":"space.svg", 
        "legend":"gap to leader",
        "display": infoSecondary.value
    },
    {
        "text": "-", 
        "icon":"speed.svg", 
        "legend":"Speed",
        "display": true
    }
]);

/**
 * Format array of athletes with positions
 * @param positions - Array of positions
 */
function formatAthletesArray(positions) {    
    const result = {};

    positions.forEach(async (obj) => {
        const athleteName = `${obj.athlete.firstName} ${obj.athlete.lastName}`;
        
        if (!result[athleteName]) {
        result[athleteName] = {
            id: obj.athlete.id,
            name: athleteName,
            race: obj.race,
            lane: obj.race.performances.find(perf => { return perf.athlete === obj.athlete.id }).lane || null,
            selected: obj.athlete.id === props.selectedAthleteId ? true : false,
            time: [],
            positions: [],
            rank: [],
            speed: [],
            gapToLeader: [],
            runnedDistance: [],
        };
        }

        result[athleteName].time.push(obj.time);
        result[athleteName].positions.push({ x: obj.coordinates[0], y: obj.coordinates[1] });
        result[athleteName].rank.push(obj.rank);
        result[athleteName].speed.push(obj.speed);
        result[athleteName].gapToLeader.push(obj.gapToLeader);
        result[athleteName].runnedDistance.push(obj.runnedDistance || 0) ;
    });

    return Object.values(result);
}

/**
 * Update data on track card
 * @param data - Data to update
 */
function updateInfos(data) {
    positionData.value = data

    infos.value = [
        {
            "text": data.rank + (data.rank != '' ? 'th' : '-'), 
            "icon":"podium.svg", 
            "legend":"Rank",
            "display": !infoSecondary.value
        },
        {
            "text": data.gapToLeader > 0 ? (data.gapToLeader + 'm') : '-', 
            "icon":"space.svg", 
            "legend":"Gap to leader",
            "display": infoSecondary.value
        },
        {
            "text": data.speed + (data.speed != '' ? 'km/h' : '-'), 
            "icon":"speed.svg", 
            "legend":"Speed",
            "display": true
        }
    ]
}

/**
 * Change informations of track card
 */
function changeInfo() {
    infoSecondary.value = !infoSecondary.value;
    updateInfos(positionData.value)
}

</script>

<template>
    <div id="container">
        <CardHeader :title="card_title"></CardHeader>
        <div id="content">
            <div class="infos">
                <InfoVertical @click="changeInfo" v-for="info in infos" v-show="info.display" :text='info.text' :icon='info.icon' :legend='info.legend' :accent='info.accent' :key="info"></InfoVertical>
                
                <div v-if="props.enableTrace" id="trace_button">
                    <img class="icon" src="../assets/icons/trace.svg">
                    <label class="switch">
                        <input type="checkbox" @click="trace = !trace;">
                        <span class="button_slider"></span>
                    </label>
                    <p class="legend">Trace</p>
                </div>

            </div>
            <Track :athletes="formatAthletesArray(positions)" :trace="trace" :enableTrace="props.enableTrace" @update="updateInfos" :selectedAthleteId="selectedAthleteId"></Track>
        </div>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 10px 20px;
        border-radius: 8px;
        width: 880px;
        max-width: 680px;
        min-height: 330px;
        box-shadow: var(--shadow);
        overflow-x: hidden;

    }

    #content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .title {
        margin-bottom: 5px;
    }

    .icon {
        width: 25px;
        height: 25px;
        filter: var(--text_filter);
        margin-bottom: 2px;
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 10px;
    }

    #trace_button {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 100px;
    }

    p.legend {
        color: var(--option);
        font-size: 14px;
        margin: 2px;
    }
    

    .switch {
        position: relative;
        display: inline-block;
        width: 58px;
        height: 18px;
        margin: 4px 0;
    }


    /* The slider */
    .button_slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--option);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 6px;
    }

    .button_slider:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: var(--primary);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 4px;
    }

    input:checked + .button_slider {
        background-color: var(--accent);
    }

    input:checked + .button_slider:before {
        -webkit-transform: translateX(32px);
        -ms-transform: translateX(32px);
        transform: translateX(32px);
    }




    @media (max-width: 1000px) {
        #container {
            width: 100%;
            max-width: 100%;
            max-width: 680px;
        }
    }

    @media (min-width: 1000px) {
        #container > :nth-child(1) {
            margin-bottom: 10px;
        }
        .infos {
            flex-direction: column;
        }

        #content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        #content > * {
            height: 100%;
        }

        #content > :nth-child(1) {
            flex: 0.1;
            height: 100%;
        }

        #content > :nth-child(2) {
            flex: 0.8
        }

        #content > :nth-child(3) {
            flex: 0.1;
            width: 100px;
        }
    }


</style>
