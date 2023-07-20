<script setup>
import { onUpdated, ref } from 'vue';
import InfoVertical from '../components/InfoVertical.vue';
import { format } from 'date-fns'

const props = defineProps({
    athletes: Array,
    trace: Boolean,
    enableTrace: Boolean,
    selectedAthleteId: String
});

const emit = defineEmits(['update'])


function findAthlete(property, value) {
    return props.athletes.find(athlete => {
        return athlete[property] == value
    })
}


let points =[];

let athletePerformance = ref(null)
let traceInfo = ref({
    "text": "-",
    "legend": "Runned Distance"
});

function getPointLine() {
    let path = document.getElementById('path_ath1')
    
    
    for (let i = 0; i < 21; i++) {
      let pt = path.getPointAtLength(Math.floor(path.getTotalLength())*i/30);
      pt.x = Math.round(pt.x);
      pt.y = Math.round(pt.y);
      
      points.push(pt);
      
    }

    console.table(points);
}

let selectedTime = ref(0);



function defineTrace(positions) {
    let path = "M"
    positions.forEach(position => {
        path += position.x + ' ' + position.y + ' ';
    });

    return path;
}

function findClosest(array, target) {
    let left = 0,
    right = array.length - 1;
    while (left < right) {
    if (Math.abs(array[left] - target) <= Math.abs(array[right] - target)) {
        right--;
    } else {
        left++;
    }
    }
    return array[left];
};

function formatTime(times) {
    let formattedTimes = [];
    
    times.forEach(time => {
        let timeArray = time.split(/[:.]/g);
        time = format(new Date(1970, 1, 1, timeArray[0], timeArray[1], timeArray[2], timeArray[3]), "HHmmssSSS");
        formattedTimes.push(parseInt(time, 10));
    });
    
    return formattedTimes;
}

function formatDisplayTime(time) {
    time = time.toString().padStart(9, '0') 

    time = time.slice(0, 2) + ":" + time.slice(2,4) + ":" + time.slice(4,6) + "." + time.slice(6,9);

    if (/00/.test(time.slice(0,2)) && /00/.test(time.slice(3,5))) {
        time = time.substring(6);
    } else if (/00/.test(time.slice(0,2))) {
        time = time.substring(3);
    }

    return time
}

let timeList = ref([])

function emitInfos(athlete) {
    if (athlete) {
        let closestNumber = findClosest(timeList, document.getElementById("range").value);

        emit('update', {
            'athlete': athlete.name,
            'rank': athlete.rank[timeList.indexOf(closestNumber)],
            'speed': athlete.speed[timeList.indexOf(closestNumber)],
            'gapToLeader': athlete.gapToLeader[timeList.indexOf(closestNumber)]
        })
    }
}

function changeTime(range) {

    let closestNumber = findClosest(timeList, range.value);
    let index = timeList.indexOf(closestNumber);

    selectedTime.value = String(closestNumber);

    props.athletes.forEach(athlete => {
        let positions = athlete.positions[index];
        let circle = document.getElementById('circle_' + athlete.name);
        circle.setAttributeNS(null, 'cx', positions.x);
        circle.setAttributeNS(null, 'cy', positions.y);
    });

    let athlete;

    if (props.selectedAthleteId) {
        athlete = findAthlete("id", props.selectedAthleteId);
    } else if (document.getElementById('athlete_select').value) {
        athlete = findAthlete("name", document.getElementById('athlete_select').value);
    }

    emitInfos(athlete);  
}



function changeSelection(athlete) {
    // Clear selection in athletes array
    props.athletes.forEach(ath => {
        ath.selected = false;
    });

    athlete = findAthlete("name", athlete);
    athlete.selected = true;

    // Update trace and circle
    // Clear class circles and traces
    let circles = Object.values(document.getElementsByTagName('circle'));
    let traces = Object.values(document.getElementsByClassName('trace'));

    for(let circle of circles) {
        circle.classList.remove("selected");
    }
    for(let trace of traces) {
        trace.classList.remove("selected");
    }


    let athlete_circle = document.getElementById('circle_'+athlete.name);
    let athlete_trace = document.getElementById('trace_'+athlete.name);
    
    if(athlete_circle) athlete_circle.classList.add("selected");
    if(athlete_trace) athlete_trace.classList.add("selected");

    traceInfo.value.text = athlete.runnedDistance[athlete.runnedDistance.length-1] > 0 ?
                                athlete.runnedDistance[athlete.runnedDistance.length-1] + "m" :
                                "-"

    emitInfos(athlete);
    
}


onUpdated(() => {

    if (props.athletes[0] && timeList.value) {
        timeList = formatTime(props.athletes[0].time);
    }

    if (props.selectedAthleteId) {
        athletePerformance.value = findAthlete('id', props.selectedAthleteId)
        if (athletePerformance.value != undefined) {
            traceInfo.value.text = athletePerformance.value.runnedDistance[athletePerformance.value.runnedDistance.length-1] + "m" || "-"
        }
    }
    

})

</script>

<template>

<div id="track">

    <svg id="track_svg" viewBox="0 0 500 260" 
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid">

        <!-- <g stroke-width="1.5px" fill="none" stroke="blue">
            <path id="path_ath1" d="M 125 210 A 62.5 62.5 0 0 1 125 45"/>
        </g> -->

        <g stroke-width="1px" fill="none">
        <path d="M 125 250 A 122.5 122.5 0 0 1 125 5"/>
        <path d="M 125 5 L 375 5"/>
        <path d="M 375 5 A 122.5 122.5 0 0 1 375 250"/>
        <path d="M 45 250 L 375 250"/>
        </g>

        <g stroke-width="0.5px" fill="none">
        <path d="M 125 245 A 115 115 0 0 1 125 10"/>
        <path d="M 125 10 L 375 10"/>
        <path d="M 375 10 A 117.5 117.5 0 0 1 375 245"/>
        <path d="M 45 245 L 375 245"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 240 A 107.5 107.5 0 0 1 125 15 M 125 15 L 375 15 M 375 15 A 112.5 112.5 0 0 1 375 240 M 45 240 L 375 240"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 235 A 100 100 0 0 1 125 20"/>
        <path d="M 125 20 L 375 20"/>
        <path d="M 375 20 A 107.5 107.5 0 0 1 375 235"/>
        <path d="M 45 235 L 375 235"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 230 A 92.5 92.5 0 0 1 125 25"/>
        <path d="M 125 25 L 375 25"/>
        <path d="M 375 25 A 102.5 102.5 0 0 1 375 230"/>
        <path d="M 45 230 L 375 230"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 225 A 85 85 0 0 1 125 30"/>
        <path d="M 125 30 L 375 30"/>
        <path d="M 375 30 A 97.5 97.5 0 0 1 375 225"/>
        <path d="M 45 225 L 375 225"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 220 A 77.5 77.5 0 0 1 125 35"/>
        <path d="M 125 35 L 375 35"/>
        <path d="M 375 35 A 92.5 92.5 0 0 1 375 220"/>
        <path d="M 45 220 L 375 220"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 215 A 70 70 0 0 1 125 40"/>
        <path d="M 125 40 L 375 40"/>
        <path d="M 375 40 A 87.5 87.5 0 0 1 375 215"/>
        <path d="M 45 215 L 375 215"/>
        </g>

        <g stroke-width="1px" fill="none">
        <path d="M 125 210 A 62.5 62.5 0 0 1 125 45"/>
        <path d="M 125 45 L 375 45"/>
        <path d="M 375 45 A 82.5 82.5 0 0 1 375 210"/>
        <path d="M 45 210 L 375 210"/>
        </g>

        <g stroke-width="1px" fill="none">
        <path d="M 45 210 L 45 250" />

        <!-- Start 100m -->
        <path d="M 80 210 L 80 250" />
        <!-- Finish line -->
        <path d="M 375 210 L 375 250" />
        </g>

        <!-- Athletes circles -->
        <circle  v-for="athlete in athletes" class="player_circle" :class="[(athlete.selected ? 'selected' : ''), (props.trace ? 'hidden': '')]" :id="'circle_'+athlete.name" :cx="athlete.positions[0].x" :cy="athlete.positions[0].y" cz="-10" r="5" />

        <!-- Athletes traces-->
        <path v-show="props.trace" class="trace" v-for="athlete in athletes" :class="athlete.selected ? 'selected' : ''" :id="'trace_'+athlete.name" :d="defineTrace(athlete.positions)"/>

    </svg>

    <p v-if="athletePerformance" class="track_info">{{athletePerformance.lane}}</p>
    <div v-else class="track_info">
        <select id="athlete_select" @change="changeSelection($event.target.value)">
            <option disabled selected>Select an athlete</option>
            <option v-for="athlete in athletes" :value="athlete.name">{{ athlete.name }}</option>
        </select>
    </div>

    <InfoVertical class="trace_info" v-if="props.trace" :text='traceInfo.text' :legend='traceInfo.legend'></InfoVertical>
    <InfoVertical class="trace_info" v-else :text='formatDisplayTime(selectedTime)' legend='Time'></InfoVertical>
</div>

<div class="slidecontainer">
    <input :class="props.trace ? 'hidden' : 'visible'"  type="range" :min="timeList[0]" :max="timeList[timeList.length - 1]" :value="selectedTime" step="0.05" class="slider" id="range" @input="event => changeTime(event.srcElement)">
</div>


</template>



<style scoped>





#track {
    position: relative;
    max-width: 420px;
}

g > path  {
    stroke: var(--option_dark);
}

circle {
    fill: var(--option);
}

circle.selected {
    fill: #C23A30;
    stroke: var(--accent);
    stroke-opacity: 40%;
    stroke-width: 15px;
    z-index: 10;
} 

circle.hidden {
    fill: none;
    stroke: none;
} 

path.trace {
    fill:none
}

path.trace.selected {
    stroke: var(--accent);
    stroke-width: 1.5px;
    stroke-linejoin: round;
}

.track_info {
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
}



select {
    font-size: 18px;
    text-align: center;
    padding-right: 10px;
    color: var(--text);
    border: none;
    background-color: var(--primary);
}

select:focus {
    outline: none;
}

.hidden {
    visibility: hidden;
}

.slidecontainer {
    
    width: 100%;
    margin-top: 10px;

}

.slider {
    overflow: hidden;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 25px;
    border: 2px solid;
    border-color: var(--option_dark);
    border-radius: 3.5px;

    background-image:linear-gradient(to right, var(--option) 10%, var(--primary) 10% 100%);
    background-repeat: repeat-x;
    background-position-y: center;
    background-position-x: 1px;
    background-size: 8px 28px;

    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
}


.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 6px;
    height: 24px;
    border-radius: 3.5px;
    background: #C23A30;
    cursor: pointer;
    box-shadow: -407px 0 0 400px #C23A3060;
}

@media (min-width: 1000px) {
        .slidecontainer {
            transform: translateY(150%) rotate(-90deg);
        }

        .slider {
            width: 250px;
        }
    }
</style>