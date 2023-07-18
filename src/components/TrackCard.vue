<script setup>
import '../style.css';
import InfoVertical from '../components/InfoVertical.vue';
import CardHeader from './CardHeader.vue';
import Track from './Track.vue';
import { onUpdated, ref } from 'vue';

const props = defineProps({
  card_title: String,
  positions: Array,
  enableTrace: Boolean
})

function formatAthletesArray(positions) {
    const result = {};

    positions.forEach((obj) => {
        const athleteName = `${obj.athlete.firstName} ${obj.athlete.lastName}`;

        if (!result[athleteName]) {
        result[athleteName] = {
            name: athleteName,
            selected: false,
            time: [],
            positions: [],
            rank: [],
            speed: [],
            gapToLeader: []
        };
        }

        result[athleteName].time.push(obj.time);
        result[athleteName].positions.push({ x: obj.coordinates[0], y: obj.coordinates[1] });
        result[athleteName].rank.push(obj.rank);
        result[athleteName].speed.push(obj.speed);
        result[athleteName].gapToLeader.push(obj.gapToLeader);
    });

    return Object.values(result);
}

let trace = ref(false);
let infos = ref([
        {
            "text": "-", 
            "icon":"podium.svg", 
            "legend":"Rank"
        },
        {
            "text": "-", 
            "icon":"speed.svg", 
            "legend":"Speed"
        }
    ]);

let athletes = [
    {
        "name": "test1",
        "selected": false,
        "time": [
            "0.00",
            "1.00",
            "1.50",
            "2.50",
            "3.00",
            "4.50",
            "5.50",
            "6.00",
            "6.50",
            "7.00",
            "8.00",
            "8.50",
            "9.00",
            "9.50",
            "10.50",
            "11.50"
        ],
        "positions": [
            {"x": 80, "y": 248},
            {"x": 100, "y": 248},
            {"x": 120, "y": 248},
            {"x": 140, "y": 248},
            {"x": 161, "y": 248},
            {"x": 181, "y": 248},
            {"x": 202, "y": 248},
            {"x": 223, "y": 248},
            {"x": 245, "y": 248},
            {"x": 265, "y": 248},
            {"x": 286, "y": 248},
            {"x": 307, "y": 248},
            {"x": 327, "y": 248},
            {"x": 347, "y": 248},
            {"x": 368, "y": 248},
            {"x": 384, "y": 248}
        ]
    },
    {
        "name": "test2",
        "selected": false,
         "time": [
            "0.00",
            "1.00",
            "1.50",
            "2.50",
            "3.00",
            "4.50",
            "5.50",
            "6.00",
            "6.50",
            "7.00",
            "8.00",
            "8.50",
            "9.00",
            "9.50",
            "10.50",
            "11.50"
        ],
        "positions": [
            {"x": 80, "y": 242},
            {"x": 100, "y": 243},
            {"x": 120, "y": 243},
            {"x": 140, "y": 242},
            {"x": 160, "y": 242},
            {"x": 181, "y": 242},
            {"x": 200, "y": 242},
            {"x": 221, "y": 243},
            {"x": 242, "y": 243},
            {"x": 262, "y": 243},
            {"x": 282, "y": 242},
            {"x": 304, "y": 242},
            {"x": 325, "y": 242},
            {"x": 345, "y": 242},
            {"x": 366, "y": 243},
            {"x": 382, "y": 242}
            /*
            {"x": 140, "y": 42},
            {"x": 112, "y": 43},
            {"x": 91, "y": 52},
            {"x": 75, "y": 62},
            {"x": 66, "y": 70},
            {"x": 53, "y": 86},
            {"x": 50, "y": 94},
            {"x": 43, "y": 119},
            {"x": 47, "y": 153},
            {"x": 50, "y": 161},
            {"x": 58, "y": 176},
            {"x": 64, "y": 183},
            {"x": 90, "y": 205},
            {"x": 125, "y": 211},
            {"x": 141, "y": 211},
            {"x": 165, "y": 211},
            {"x": 190, "y": 211},
            {"x": 215, "y": 211},
            {"x": 247, "y": 211},
            {"x": 270, "y": 211},
            {"x": 294, "y": 211},
            {"x": 315, "y": 211},
            {"x": 342, "y": 211},
            {"x": 375, "y": 211},
            */
        ]
    },
    {
        "name": "test3",
        "selected": false,
         "time": [
            "0.00",
            "1.00",
            "1.50",
            "2.50",
            "3.00",
            "4.50",
            "5.50",
            "6.00",
            "6.50",
            "7.00",
            "8.00",
            "8.50",
            "9.00",
            "9.50",
            "10.50",
            "11.50"
        ],
        "positions": [
            {"x": 80, "y": 237},
            {"x": 100, "y": 237},
            {"x": 120, "y": 237},
            {"x": 140, "y": 237},
            {"x": 160, "y": 237},
            {"x": 180, "y": 237},
            {"x": 197, "y": 237},
            {"x": 218, "y": 237},
            {"x": 239, "y": 237},
            {"x": 259, "y": 237},
            {"x": 279, "y": 237},
            {"x": 300, "y": 237},
            {"x": 321, "y": 237},
            {"x": 341, "y": 237},
            {"x": 361, "y": 237},
            {"x": 377, "y": 237}

        ]
    }
]

function updateInfos(data) {
    infos.value = [
        {
            "text": data.rank + 'th', 
            "icon":"podium.svg", 
            "legend":"Rank"
        },
        {
            "text": data.speed + ' km/h', 
            "icon":"speed.svg", 
            "legend":"Speed"
        }
    ]
}

onUpdated(() => {
    
})

</script>

<template>
    <div id="container">
        <CardHeader :title="card_title"></CardHeader>
        <div id="content">
            <div class="infos">
                <InfoVertical v-for="info in infos" :text='info.text' :icon='info.icon' :legend='info.legend' :accent='info.accent'></InfoVertical>
                
                <div v-if="props.enableTrace" id="trace_button">
                    <img class="icon" src="../assets/icons/trace.svg">
                    <label class="switch">
                        <input type="checkbox" @click="trace = !trace;">
                        <span class="button_slider"></span>
                    </label>
                    <p class="legend">Trace</p>
                </div>

            </div>
            <Track :athletes="formatAthletesArray(positions)" :trace="trace" :enableTrace="props.enableTrace" @update="updateInfos"></Track>
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
