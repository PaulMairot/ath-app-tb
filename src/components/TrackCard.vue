<script setup>
import '../style.css';
import InfoVertical from '../components/InfoVertical.vue';
import CardHeader from './CardHeader.vue';
import Track from './Track.vue';

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
        <div id="content">
            <div class="infos">
                <InfoVertical v-for="info in infos" :text='info.text' :icon='info.icon' :legend='info.legend' :accent='info.accent'></InfoVertical>
                
                <div id="trace_button">
                    <img class="icon" src="../assets/icons/trace.svg">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="button_slider"></span>
                    </label>
                    <p class="legend">Trace</p>
                </div>

            </div>
            <Track></Track>
        </div>
    </div>
</template>

<style scoped>
    #container {
        background-color: var(--primary);
        padding: 10px 20px;
        border-radius: 8px;
        max-width: 680px;
        min-height: 330px;
        box-shadow: var(--shadow);

        margin-bottom: 10px;

    }

    #content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .title {
        margin-bottom: 5px;
    }

    .icon {
        width: 25px;
        height: 25px;
        filter: var(--text_filter);
        margin-bottom: 2px;
    }

    .icon.accent{
        filter: var(--accent_filter)
    }

    .infos {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 10px;
    }

    #trace_button {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 100px;
    }

    p.legend {
        color: var(--option);
        font-size: 14px;
        margin: 2px;
    }
    

    .switch {
        position: relative;
        display: inline-block;
        width: 58px;
        height: 18px;
        margin: 4px 0;
    }


    /* The slider */
    .button_slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--option);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 6px;
    }

    .button_slider:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: var(--primary);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 4px;
    }

    input:checked + .button_slider {
        background-color: var(--accent);
    }

    input:checked + .button_slider:before {
        -webkit-transform: translateX(32px);
        -ms-transform: translateX(32px);
        transform: translateX(32px);
    }




    @media (max-width: 600px) {
        #container {
            max-width: 100%;
        }
    }

    @media (min-width: 600px) {
        #container > :nth-child(1) {
            margin-bottom: 40px;
        }
        .infos {
            flex-direction: column;
        }

        #content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        #content > * {
            height: 100%;
        }

        #content > :nth-child(1) {
            flex: 0.1;
            height: 100%;
        }

        #content > :nth-child(2) {
            flex: 0.8
        }

        #content > :nth-child(3) {
            flex: 0.1;
            width: 100px;
        }
    }


</style>
