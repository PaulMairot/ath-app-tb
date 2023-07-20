<script setup>
import '../style.css';
import InfoVertical from '../components/InfoVertical.vue';
import Info from '../components/Info.vue';
import ResultList from '../components/ResultList.vue';
import CardHeader from './CardHeader.vue';
import { onBeforeMount, ref, toRaw, watchEffect } from 'vue';
import * as RaceService from '../services/Race.js'


const props = defineProps({
  card_title: String,
  infos: Array,
  list_title: String,
  list_infos: Array
})

</script>

<template>
    <div id="container">
        <CardHeader :title="card_title"></CardHeader>
        <div class="infos">
            <InfoVertical v-for="info in infos" :text='info.text' :icon='info.icon' :legend='info.legend' :accent='info.accent'></InfoVertical>
        </div>
        <ResultList v-if="list_infos" :title="list_title" :results="list_infos" :key="list_infos.meeting"></ResultList>
    </div>
</template>



<style scoped>
    #container {
        background-color: var(--primary);
        padding: 10px 20px;
        border-radius: 8px;
        max-width: 370px;
        box-shadow: var(--shadow);
    }

    .title {
        margin-bottom: 5px;
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }

</style>
