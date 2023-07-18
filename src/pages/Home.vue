<script setup>
import axios from "axios"

import PageHeader from '../components/PageHeader.vue';
import CardHeader from '../components/CardHeader.vue';
import EventCard from '../components/EventCard.vue';
import RaceCard from '../components/RaceCard.vue';
import SeeAllButton from "../components/SeeAllButton.vue";
import RaceCardDetailled from '../components/RaceCardDetailled.vue';
import DefaultCard from '../components/DefaultCard.vue';
import ChartCard from '../components/ChartCard.vue';
import TrackCard from '../components/TrackCard.vue';

import * as MeetingService from '../services/Meeting.js'
import * as RaceService from '../services/Race.js'

import { onMounted, ref } from 'vue';
import { format, compareAsc } from 'date-fns'



let upcomingMeetings = ref([]); 
let pastMeeting = ref([]);

let finishedRaces = ref([]);
let liveRaces = ref([]);

let cardTestChart = [
    {
        "text":"28.8 km/h", 
        "icon":"speed.svg", 
        "legend":"Average"
    }
]

let cardTestAthlete = [
    {
        "text":"12.06.1998", 
        "icon":"calendar.svg", 
        "legend":"Date of birth"
    },
    {
        "text":"Quatar", 
        "icon":"qa", 
        "legend":"Nationality"
    },
    {
        "text":"400m / 200m", 
        "icon":"shoe.svg", 
        "legend":"Disciplines"
    }
]

let cardTestInfos = [
    {
        "text":"4", 
        "icon":"podium.svg", 
        "legend":"Rank"
    },
    {
        "text":"48.57", 
        "icon":"chrono.svg", 
        "legend":"Result",
        "accent":true
    },
    {
        "text":"+0.199 ms", 
        "icon":"push.svg", 
        "legend":"Reaction Time"
    }
]

let cardTestList = [
    {
        "meeting":"Diamond League", 
        "date":"5 MAY 2023", 
        "race":"400m",
        "result":"48.57"
    },
    {
        "meeting":"ACNW", 
        "date":"7 MAR 2023", 
        "race":"200m",
        "result":"22.23"
    }
]

let cardTestTrack = [
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

    finishedRaces.value = await RaceService.getRaces('finished', 4);
    liveRaces.value = await RaceService.getRaces('live', 1)
})

</script>


<template>

    <PageHeader title="Home" :back_button='false'></PageHeader>

    <div id="content">
        <div class="column">
            <div v-if="liveRaces.length" class="group_infos">
                <CardHeader title="Live" :live="true"></CardHeader>

                <RaceCard v-for="race in liveRaces" 
                    :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
                    :meeting="race.meeting.name" 
                    :link="'#/race/' + race.id" 
                    link_text="Follow live"></RaceCard>
            </div>

            <div class="group_infos">
                <CardHeader title="Latest races" :live="false"></CardHeader>

                <RaceCard v-for="race in finishedRaces" 
                    :title="race.discipline.distance + 'm ' + race.discipline.gender.toUpperCase()" 
                    :meeting="race.meeting.name" 
                    :link="'#/race/' + race.id" 
                    link_text="See results"></RaceCard>

                <SeeAllButton></SeeAllButton>
            </div>
        </div>

        <div class="group_infos">
            <CardHeader title="Upcoming events" :live="false"></CardHeader>

            <EventCard v-for="meeting in upcomingMeetings" 
                :title="meeting.name" 
                :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                :date="formatEventDate(meeting.startDate, meeting.endDate)">
            </EventCard>
            
            <SeeAllButton></SeeAllButton>
        </div>

        <div class="group_infos">
            <CardHeader title="Past events" :live="false"></CardHeader>
            
            <EventCard v-for="meeting in pastMeeting" 
                :title="meeting.name" 
                :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                :date="formatEventDate(meeting.startDate, meeting.endDate)">
            </EventCard>
            
            <SeeAllButton></SeeAllButton>
        </div>
    </div>

    <!--
    <TrackCard card_title="Rewind" :infos="cardTestTrack" :enableTrace="true"></TrackCard>

    <ChartCard card_title="Speed" :infos="cardTestChart">tew</ChartCard>
    
    <DefaultCard card_title="About the athlete" :infos="cardTestAthlete" listTitle="Latest results" :listInfos="cardTestList"></DefaultCard>
    <DefaultCard card_title="Highlights" :infos="cardTestInfos"></DefaultCard>
    
    <div class="group_infos">
        <CardHeader title="All races"></CardHeader>
        <RaceCard title="100m MEN" meeting="Wanda Diamond League" link="#/race" link_text="See results"></RaceCard>
        <RaceCard title="400m WOMEN" meeting="Wanda Diamond League" time="Start at 18:40"></RaceCard>
    </div>

    <EventCard title="Wanda Diamond League" city="Rabat (MAR)" date="28 MAY 2023"></EventCard>
    
    <RaceCardDetailled 
        title="400m MEN"
        meeting="Wanda Diamond League" 
        date="5 MAY 2023"
        time="18:40"
        location="Qatar SC Stadium"
        city="Doha (QAT)"
        condition="cloudy"
        temperature="34"
        wind="+2">
    </RaceCardDetailled>
    <RaceCardDetailled 
        meeting="Wanda Diamond League" 
        date="5 MAY 2023"
        time="18:40"
        location="Qatar SC Stadium"
        city="Doha (QAT)"
        condition="cloudy"
        temperature="34"
        wind="+2">
    </RaceCardDetailled>
    -->
</template>

<style scoped>

    
    
    .group_infos {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
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

        .group_infos > #container {
            box-shadow: none;
            border: 1px solid var(--option);
        }
    }
</style>