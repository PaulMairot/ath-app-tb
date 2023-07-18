<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { format, compareAsc } from 'date-fns'

import PageHeader from '../components/PageHeader.vue';
import DefaultCard from '../components/DefaultCard.vue';
import RaceCard from '../components/RaceCard.vue';

import * as PerformanceService from '../services/Performance.js'
import * as RaceService from '../services/Race.js'
import Performance from '../services/PerformanceModel.js'


import TrackCard from '../components/TrackCard.vue';
import ChartCard from '../components/ChartCard.vue';

const props = defineProps({
  live: Boolean
})

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

function formatEventDate(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (compareAsc(startDate, endDate) == 0) {
        return format(startDate, 'd LLL yyyy').toUpperCase();
    } else {
        return (format(startDate, 'd') + '-' + format(endDate, 'd LLL yyyy')).toUpperCase();
    }
}

</script>

<template>
  <PageHeader
    :title="capitalizeWord(performance.athlete.lastName) + ' ' + capitalizeFirstLetters(performance.athlete.firstName)" 
    :back_button='true'>
  </PageHeader>

  <div id="content">

    <div class="column">
        <DefaultCard
            card_title="Highlights"
            :infos="PerformanceService.getHighlights(performance)">
        </DefaultCard>

        <RaceCard 
            card_title="Race informations" 
            :title="performance.race.discipline.distance + 'm ' + performance.race.discipline.gender.toUpperCase()"
            :meeting="performance.race.meeting.name">
        </RaceCard>

        <ChartCard 
            card_title="Starting" 
            :infos="[PerformanceService.getReactionTimeInfos(performance)]" 
            :data="pressures" 
            xAxisLabel="TIME [ms]"
            yAxisLabel="FORCE [N]"
            :xMin="-300" 
            :xMax="Math.max(...speeds.map(i => i.y))"
            :xTick="100"
            :yTick="100">
        </ChartCard>

    </div>
    <div class="column">
        <div class="row">
            <ChartCard 
                card_title="Speed" 
                :infos="[PerformanceService.getAverageSpeedInfos(speeds)]" 
                :data="speeds" 
                xAxisLabel="TIME [s]"
                yAxisLabel="SPEED [km/h]"
                :xMin="0" 
                :xMax="Math.max(...speeds.map(i => i.y))"
                :xTick="1"
                :yTick="1">
            </ChartCard>

            <DefaultCard
                card_title="About the athlete" 
                :infos="PerformanceService.getAthleteInfos(performance)" 
                listTitle="Latest results" 
                :listInfos="latestRaces">
            </DefaultCard>
        </div>

        <TrackCard card_title="Position" :enableTrace="true" :positions="positions"></TrackCard>
    </div>
    

  </div>
</template>

<script>

export default {
    data() {
        return {
            performance: new Performance,
            speeds: [],
            pressures: [],
            latestRaces: [],
            positions: []
        };
    },
    async created() {
        const route = useRoute();
        this.performance = await PerformanceService.getPerformanceById(route.params.id);
        //console.log(this.performance);
        
        this.speeds = PerformanceService.getSpeedArray(this.performance.positions);
        this.pressures = PerformanceService.getPressureArray(this.performance.startingPressure.pressure, this.performance.startingPressure.time);
        this.latestRaces = await PerformanceService.getLatestPerformance(this.performance.athlete.id, 2); 
        this.positions = await RaceService.getRacePositions(this.performance.race.id);
    },
    components: { DefaultCard, RaceCard, TrackCard, ChartCard }
}
    
</script>

<style scoped>
  .group_infos {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
        min-width: 370px;
        max-width: 100%;

        flex-grow: 1
    }

    .group_infos > #container {
        border-radius: 8px;
        box-shadow: var(--shadow);
        border: none;
    }

    .column {
        display: flex;
        flex-direction: column;
        gap: 20px; 
        flex: 0 1 250px;
    }

    .row {
        display: flex;
        flex-direction: row;
        gap: 20px;
        
    }

    @media (min-width: 600px) {
        #content {
            display: flex;
            flex-direction: row;
            gap: 20px
        }
        .group_infos {
            border-radius: 8px;
            box-shadow: var(--shadow);
            background-color: var(--primary);
            padding: 20px;
            
            max-width: 370px;
        }

        .group_infos > #container {
            box-shadow: none;
            border: 1px solid var(--option);
        }
    }
</style>