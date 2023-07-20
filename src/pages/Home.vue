<script setup>
import axios from "axios"

import PageHeader from '../components/PageHeader.vue';
import CardHeader from '../components/CardHeader.vue';
import EventCard from '../components/EventCard.vue';
import RaceCard from '../components/RaceCard.vue';
import SeeAllButton from "../components/SeeAllButton.vue";

import * as MeetingService from '../services/Meeting.js'
import * as RaceService from '../services/Race.js'

import { onMounted, ref } from 'vue';
import { format, compareAsc } from 'date-fns'



let upcomingMeetings = ref([]); 
let pastMeeting = ref([]);

let races = ref([]);
let finishedRaces = ref([]);
let liveRaces = ref([]);

function formatEventDate(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (compareAsc(startDate, endDate) == 0) {
        return format(startDate, 'd LLL yyyy').toUpperCase();
    } else {
        return (format(startDate, 'd') + '-' + format(endDate, 'd LLL yyyy')).toUpperCase();
    }
}

onMounted(async ()=> {
    upcomingMeetings.value = await MeetingService.getUpcomingMeetings(format(new Date(), 'yyyy-MM-dd'), 4);
    pastMeeting.value = await MeetingService.getPastMeetings(format(new Date(), 'yyyy-MM-dd'), 4);

    races.value = await RaceService.getRaces();
    finishedRaces.value = races.value.filter(race => race.state == 'finished')
    liveRaces.value = races.value.filter(race => race.state == 'live');
})

</script>


<template>

    <PageHeader title="Home" :back_button='false'></PageHeader>

    <div id="content">
        <div class="column">
            <div v-if="liveRaces.length" class="group_infos">
                <CardHeader title="Live" :live="true"></CardHeader>

                <div class="list">
                    <RaceCard v-for="race in liveRaces" 
                        :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
                        :meeting="race.meeting.name" 
                        :link="'#/race/' + race.id" 
                        link_text="Follow live">
                    </RaceCard>
                </div>
            </div>

            <div class="group_infos">
                <CardHeader title="Latest races" :live="false"></CardHeader>
                <div class="list">
                    <RaceCard v-for="race in finishedRaces.slice(0, 4)" 
                        :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
                        :meeting="race.meeting.name" 
                        :link="'#/race/' + race.id" 
                        link_text="See results">
                    </RaceCard>

                    <p class="no_content" v-if="!finishedRaces.length">No race at this moment.</p>
                </div>

                <SeeAllButton v-if="finishedRaces.length" link="#/races"></SeeAllButton>
            </div>
        </div>

        <div class="group_infos">
            <CardHeader title="Upcoming events" :live="false"></CardHeader>
            <div class="list">
                <EventCard v-for="meeting in upcomingMeetings.slice(0, 4)" 
                    :title="meeting.name" 
                    :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                    :date="formatEventDate(meeting.startDate, meeting.endDate)"
                    :link="'#/meeting/' + meeting.id">
                </EventCard>

                <p class="no_content" v-if="!upcomingMeetings.length">No upcoming meeting at this moment.</p>
            </div>
            
            <SeeAllButton v-if="upcomingMeetings.length" link="#/meetings"></SeeAllButton>
        </div>

        <div class="group_infos">
            <CardHeader title="Past events" :live="false"></CardHeader>
            <div class="list">
                <EventCard v-for="meeting in pastMeeting.slice(0, 4)" 
                    :title="meeting.name" 
                    :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                    :date="formatEventDate(meeting.startDate, meeting.endDate)"
                    :link="'#/meeting/' + meeting.id">
                </EventCard>

                <p class="no_content" v-if="!pastMeeting.length">No meeting at this moment.</p>
            </div>
            
            <SeeAllButton v-if="pastMeeting.length" link="#/meetings"></SeeAllButton>
        </div>
    </div>

</template>

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
    }

    .column {
        display: flex;
        flex-direction: column;
        
    }

    .no_content {
      text-align: center;
      min-width: 300px;
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
            padding: 10px 20px;
            margin: 10px 0;
            
            max-width: 370px;
        }

        .group_infos > .list > #container {
            box-shadow: none;
            border: 1px solid var(--option);
        }
    }
</style>