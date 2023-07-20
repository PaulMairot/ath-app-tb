<script setup>
import { useRoute } from 'vue-router'

import PageHeader from '../components/PageHeader.vue';
import InfoVertical from '../components/InfoVertical.vue';
import DefaultCard from '../components/DefaultCard.vue';
import CardHeader from '../components/CardHeader.vue';
import RaceCard from '../components/RaceCard.vue';

import * as MeetingService from '../services/Meeting.js'
import Meeting from '../services/MeetingModel.js'
import * as RaceService from '../services/Race.js'

import { format, compareAsc } from 'date-fns'
import { onMounted, ref } from 'vue';

function formatEventDate(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (compareAsc(startDate, endDate) == 0) {
        return format(startDate, 'd LLL yyyy').toUpperCase();
    } else {
        return (format(startDate, 'd') + '-' + format(endDate, 'd LLL yyyy')).toUpperCase();
    }
}

let races = ref([]);
onMounted(async ()=> {
    races.value = await RaceService.getRaces();
    
})
</script>

<template>
    <PageHeader :title="meeting.name" :back_button="true"></PageHeader>
    <div id="content">
        <DefaultCard card_title="Meeting informations" :infos="formatedInfo"></DefaultCard>

        <div class="group_infos">
            <CardHeader title="Latest races" :live="false"></CardHeader>
            <div class="list">
                <RaceCard v-for="race in races" 
                    :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
                    :meeting="race.meeting.name" 
                    :link="'#/race/' + race.id" 
                    link_text="See results">
                </RaceCard>

                <p class="no_content" v-if="!races.length">No race at this moment.</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            meeting: new Meeting,
            formatedInfo: []
        };
    },
    async created() {
        const route = useRoute();
        this.meeting = await MeetingService.getMeetingById(route.params.id);
        console.log(this);
        if (this.meeting)
        this.formatedInfo = [
            {
                "text": this.meeting.city, 
                "icon": "city.svg", 
                "legend": this.meeting.country.name
            },
            {
                "text": this.meeting.startDate, 
                "icon": "calendar.svg", 
                "legend": "Starting"
            },
            {
                "text": this.meeting.races.length, 
                "icon": "shoe.svg", 
                "legend": "Races"
            }
        ]
        
    }
}
</script>

<style scoped>
    .group_infos {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
        max-width: 100%;
        flex-grow: 1;
    }

    .group_infos > .list > #container {
        border-radius: 8px;
        box-shadow: var(--shadow);
        border: none;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 55vh;
        overflow: scroll;
    }

    .no_content {
      text-align: center;
      min-width: 300px;
    }

    @media (min-width: 600px) {
        
        
        .group_infos {
            border-radius: 8px;
            box-shadow: var(--shadow);
            background-color: var(--primary);
            padding: 10px 20px;
            margin: 10px 0;
            
            max-width: 370px;
        }

        .group_infos > .list > #container {
            box-shadow: none;
            border: 1px solid var(--option);
        }
    }

    @media (max-width: 600px) {
        #content {
            display: flex;
            flex-direction: column;
            gap: 20px
        }
        .list {
            max-height: auto;
            overflow: visible;
        }
    }
</style>