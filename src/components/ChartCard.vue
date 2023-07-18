<script setup>
import '../style.css';
import CardHeader from './CardHeader.vue';
import InfoVertical from '../components/InfoVertical.vue';
import Chart from '../components/Chart.vue';


const props = defineProps({
  card_title: String,
  infos: Array,
  data: Array,

  xAxisLabel: String,
  yAxisLabel: String,

  xMin: Number,
  xMax: Number,

  xTick: Number,
  yTick: Number
})

</script>

<template>
    <div id="container">
        <CardHeader :title="card_title"></CardHeader>

        <div class="infos">
            <InfoVertical v-for="info in infos" :text='info.text' :icon='info.icon' :legend='info.legend' :accent='info.accent'></InfoVertical>
        </div>

        <div class="chart" v-if="data">
            <Chart :data="data" :xAxisLabel="xAxisLabel" :yAxisLabel="yAxisLabel" :xMin="xMin" :xMax="xMax" :xTick="xTick" :yTick="yTick" :key="data"></Chart>
        </div>
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

    .chart {
        width: 100%;
    }

    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }

</style>
