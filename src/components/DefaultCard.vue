<script setup>
import '../style.css';
import InfoVertical from '../components/InfoVertical.vue';
import ResultList from '../components/ResultList.vue';
import CardHeader from './CardHeader.vue';

const props = defineProps({
  cardTitle: String,
  infos: Array,
  listTitle: String,
  listInfos: Array
})

</script>

<template>
    <div id="container">
        <CardHeader :title="cardTitle"></CardHeader>
        <div class="infos">
            <InfoVertical v-for="info in infos" :text='info.text' :icon='info.icon' :legend='info.legend' :accent='info.accent'></InfoVertical>
        </div>
        <ResultList v-if="listInfos" :title="listTitle" :results="listInfos"></ResultList>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 10px 20px;
        border-radius: 8px;
        max-width: 370px;
        box-shadow: var(--shadow);

        margin-bottom: 10px;
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
