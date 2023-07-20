<script setup>
import { onMounted, ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import CardHeader from '../components/CardHeader.vue';
import EventCard from '../components/EventCard.vue';
import * as MeetingService from '../services/Meeting.js'

import { format, compareAsc, compareDesc, parseISO } from 'date-fns'

let meetings = ref([]);
let upcomingMeetings = ref([]);
let pastMeetings = ref([]);
let competitionList = ref([]);

let competition_selected = ref("");

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
    meetings.value = await MeetingService.getMeetings();

    upcomingMeetings.value = meetings.value.filter(meeting => compareAsc(parseISO(meeting.endDate), new Date()) > 0);
    pastMeetings.value = meetings.value.filter(meeting => compareAsc(parseISO(meeting.endDate), new Date()) < 0);

    // Get all meetings names
    competitionList.value = meetings.value.map(function(meeting) { return meeting.name });
    // Remove diplicates
    competitionList.value = competitionList.value.filter((element, index) => {
        return competitionList.value.indexOf(element) === index;
    });
})
</script>

<template>

    <PageHeader title="Meetings" :back_button='true'></PageHeader>

    <CardHeader v-if="upcomingMeetings.length" title="Upcoming" :live="false"></CardHeader>
    <section v-if="upcomingMeetings.length">
        <EventCard v-for="meeting in upcomingMeetings" 
                    :title="meeting.name" 
                    :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                    :date="formatEventDate(meeting.startDate, meeting.endDate)"
                    :link="'#/meeting/' + meeting.id">
        </EventCard>
    </section>

    <CardHeader v-if="pastMeetings.length" title="Previous" :live="false"></CardHeader>
    <section v-if="pastMeetings.length">
        <EventCard v-for="meeting in pastMeetings" 
                    :title="meeting.name" 
                    :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                    :date="formatEventDate(meeting.startDate, meeting.endDate)"
                    :link="'#/meeting/' + meeting.id">
        </EventCard>
    </section>

    <CardHeader v-if="pastMeetings.length" title="By competition" :live="false"></CardHeader>
    <select id="competition_select" v-model="competition_selected">
        <option disabled selected value="">Select a competition</option>
        <option v-for="competition in competitionList" :value="competition">{{ competition }}</option>
    </select>

    <section v-if="pastMeetings.length">
        <EventCard v-for="meeting in MeetingService.filterMeetings(meetings, competition_selected)" 
                    :title="meeting.name" 
                    :city=" meeting.city + ' (' + meeting.country.alpha3 + ')' " 
                    :date="formatEventDate(meeting.startDate, meeting.endDate)"
                    :link="'#/meeting/' + meeting.id">
        </EventCard>
    </section>


</template>

<style scoped>

section {
    display:flex;
    width:100%;
    gap: 10px;
    overflow:auto;
    padding-bottom: 15px;
    margin-bottom: 20px;
}

section > * {
    min-width: 280px;
}

.header:nth-child(6) {
    max-width: 150px;
    margin-right: 5px;
    display: inline-block;
}

select {
    font-size: 16px;
    text-align: right;
    padding-right: 10px;
    color: var(--text);
    border: none;
    background-color: var(--background);
}

select:focus {
    outline: none;
}

</style>