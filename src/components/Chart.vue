<script setup>
import '../style.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps ({
    xAxisLabel: String,
    yAxisLabel: String,
    xMin: Number,
    xMax: Number,
    xTick: Number,
    yTick: Number,
    data: Array
})

let datas;

if (props.data) {

  datas = props.data.map(item => {
    const keys = Object.keys(item);

    let updatedItem = {};

    Object.keys(item).forEach(key => {
      updatedItem["x"] = item[keys[0]];
      updatedItem["y"] = item[keys[1]];
    });

    return updatedItem;
  })

}

const aspectRatioValue = props.yTick >= 100 ? 1.2 : 1.5

const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
const optionColor = getComputedStyle(document.documentElement).getPropertyValue('--option') + "70";

const graphOption = {
      animation: {
            duration: 0
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: aspectRatioValue,
        elements: {
          point:{
              radius: 0
          }
        },
        plugins: {
          legend : {
            display: false,
            textDirection: 'rtl'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: props.xAxisLabel
            },
            type: 'linear',
            min: props.xMin,
            max: props.xMax,
            ticks: {
              stepSize: props.xTick
            },
            grid: {
                color: optionColor
            }
          },
          y: {
            title: {
              display: true,
              text: props.yAxisLabel
            },
            type: 'linear',
            min: 0,
            ticks: {
              stepSize: props.yTick
            },
            grid: {
                color: optionColor
            }
          },
        }
}


let graphData = {
        datasets: [{
        data: datas,
        borderColor: accentColor,
        fill: {
                target: 'origin',
                above: function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;

                let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(1, accentColor + "99");
                gradient.addColorStop(0.5, accentColor + "70");
                gradient.addColorStop(0, accentColor + "05");
                return gradient;
                },   // Area will be red above the origin
        },
        tension: .25,
        }]
}

</script>

<template>
    <Line id="lineChart" :data="graphData" :options="graphOption" ref="line"/>
</template>


<style scoped>
    #lineChart {
        width: 100%
    }
</style>