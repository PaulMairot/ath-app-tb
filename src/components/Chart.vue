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
    data: Object
})

const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
const optionColor = getComputedStyle(document.documentElement).getPropertyValue('--option') + "70";
const delayBetweenPoints = 1.5;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }, 
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

const graphOption = {
        //animation,
        responsive: true,
        maintainAspectRatio: true,
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
              stepSize: 100
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
              stepSize: 100
            },
            grid: {
                color: optionColor
            }
          },
        },
      }
const graphData = {
        datasets: [{
        data: props.data.Value,
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
        width: 80vw;
    }
</style>