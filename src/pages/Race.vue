<script setup>
import { useRoute } from 'vue-router'
import { format, compareAsc } from 'date-fns'

import PageHeader from '../components/PageHeader.vue';
import athleteRankCard from '../components/AthleteRankCard.vue';
import * as RaceService from '../services/Race.js'
import RaceCardDetailled from '../components/RaceCardDetailled.vue';

import Race from '../services/RaceModel.js'

import TrackCard from '../components/TrackCard.vue';
const props = defineProps({
  live: Boolean
})

const trackDefaultInfo = [
    {
        "text":"4th", 
        "icon":"podium.svg", 
        "legend":"Rank"
    },
    {
        "text":"27.2 km/h", 
        "icon":"speed.svg", 
        "legend":"Speed"
    }
]

/* onBeforeMount(async ()=> {
  race = await RaceService.getRaceById(route.params.id)
  console.log(race.meeting);
 })*/



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
    :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
    :back_button='true' 
    :live='race.state == "live"'>
  </PageHeader>

  <div id="content">

    <div class="column">
      <div class="group_infos">
        <athleteRankCard v-for="performance in race.performances" 
          :lastName="performance.athlete.lastName" 
          :firstName="performance.athlete.firstName" 
          :nationality="performance.athlete.nationality.alpha2"
          :time="performance.result" 
          :rank="performance.rank" 
          :mentions="performance.mention"
          :link="'#/performance/' + performance.id">
        </athleteRankCard>

        <p class="no_content" v-if="race.athletes && !race.athletes.length">No athletes for this race.</p>


      </div>
    </div>
    <div class="column">
      <RaceCardDetailled
            :meeting="race.meeting.name" 
            :date="formatEventDate(race.meeting.startDate, race.meeting.endDate)"
            :time="race.plannedStartTime"
            :location="race.meeting.location"
            :city="race.meeting.city"
            :conditions="race.conditions"
            :temperature="race.temperature"
            :wind="race.windSpeed">
      </RaceCardDetailled>

      <TrackCard v-if="race.athletes && race.athletes.length" :card_title="race.state == 'finished' ? 'Rewind' : 'Live'" :enableTrace="race.state == 'finished'" :positions="positions"></TrackCard>
      
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            race: new Race,
            positions: []
        };
    },
    async created() {
        const route = useRoute();
        this.race = await RaceService.getRaceById(route.params.id);

        if (this.race.athletes.length) {
          this.positions = await RaceService.getRacePositions(route.params.id);
        }
        
    },
    components: { TrackCard }
}
    
</script>

<style scoped>
  .group_infos {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
        max-width: 100%;
        margin-bottom: 10px;
        flex-grow: 1;
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
        
    }

    .no_content {
      text-align: center;
      min-width: 300px;
    }

    .group_infos:has(> p.no_content) { 
      flex-grow: 0;
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
            margin-bottom: 0;
            max-width: 370px;
        }

        .group_infos > #container {
            box-shadow: none;
            border: 1px solid var(--option);
        }
    }
</style>
