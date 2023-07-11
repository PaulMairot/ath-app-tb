<script setup>
import '../style.css';
import InfoVertical from '../components/InfoVertical.vue';
import CardHeader from './CardHeader.vue';
import Track from './Track.vue';
import { ref } from 'vue';

const props = defineProps({
  cardTitle: String,
  infos: Array,
  listTitle: String,
  listInfos: Array,
  enableTrace: Boolean
})

let trace = ref(false);

let athletes = [
    {
        "name": "test1",
        "selected": false,
        "time": [
            "0.00",
            "1.08",
            "2.17",
            "3.26",
            "3.78",
            "4.34",
            "5.43",
            "6.52",
            "7.14",
            "7.60",
            "8.69",
            "9.78",
            "10.23",
            "10.86",
            "11.95",
            "13.04",
            "14.12",
            "15.21",
            "16.30",
            "16.80",
            "17.38",
            "18.47",
            "19.56",
            "20.64"
        ],
        "positions": [
            {"x": 120, "y": 20},
            {"x": 101, "y": 23},
            {"x": 82, "y": 29},
            {"x": 65, "y": 38},
            {"x": 50, "y": 51},
            {"x": 37, "y": 66},
            {"x": 27, "y": 83},
            {"x": 21, "y": 101},
            {"x": 18, "y": 140},
            {"x": 40, "y": 193},
            {"x": 53, "y": 208},
            {"x": 69, "y": 219},
            {"x": 106, "y": 233},
            {"x": 125, "y": 235},
            {"x": 142, "y": 235},
            {"x": 167, "y": 235},
            {"x": 192, "y": 235},
            {"x": 217, "y": 235},
            {"x": 250, "y": 235},
            {"x": 272, "y": 235},
            {"x": 298, "y": 235},
            {"x": 315, "y": 235},
            {"x": 342, "y": 235},
            {"x": 375, "y": 235},
        ]
    },
    {
        "name": "test2",
        "selected": false,
         "time": [
            "0.00",
            "1.08",
            "2.17",
            "3.26",
            "3.78",
            "4.34",
            "5.43",
            "6.52",
            "7.14",
            "7.60",
            "8.69",
            "9.78",
            "10.23",
            "10.86",
            "11.95",
            "13.04",
            "14.12",
            "15.21",
            "16.30",
            "16.80",
            "17.38",
            "18.47",
            "19.56",
            "20.64"
        ],
        "positions": [
            
            

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
        ]
    }
]

</script>

<template>
    <div id="container">
        <CardHeader :title="cardTitle"></CardHeader>
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
            <Track :athletes="athletes" :trace="trace" :enableTrace="props.enableTrace"></Track>
        </div>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 10px 20px;
        border-radius: 8px;
        max-width: 680px;
        min-height: 330px;
        box-shadow: var(--shadow);

        margin-bottom: 10px;

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




    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }

    @media (min-width: 600px) {
        #container > :nth-child(1) {
            margin-bottom: 40px;
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
