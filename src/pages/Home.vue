<script setup>
import PageHeader from '../components/PageHeader.vue';
import CardHeader from '../components/CardHeader.vue';
import EventCard from '../components/EventCard.vue';
import RaceCard from '../components/RaceCard.vue';
import RaceCardDetailled from '../components/RaceCardDetailled.vue';
import DefaultCard from '../components/DefaultCard.vue';
import ChartCard from '../components/ChartCard.vue';
import TrackCard from '../components/TrackCard.vue';

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

</script>

<template>
    <PageHeader title="Home" :back_button='false'></PageHeader>

    <TrackCard cardTitle="Rewind" :infos="cardTestTrack"></TrackCard>

    <ChartCard cardTitle="Speed" :infos="cardTestChart">tew</ChartCard>
    
    <DefaultCard cardTitle="About the athlete" :infos="cardTestAthlete" listTitle="Latest results" :listInfos="cardTestList"></DefaultCard>
    <DefaultCard cardTitle="Highlights" :infos="cardTestInfos"></DefaultCard>
    
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
</template>

<style scoped>
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

    @media (max-width: 600px) {

        .group_infos {
            box-shadow: none;
            background-color: transparent;
            padding: 0;
            max-width: 100%;
        }

        .group_infos > #container {
            border-radius: 8px;
            box-shadow: var(--shadow);
            border: none;
        }
    }
</style>