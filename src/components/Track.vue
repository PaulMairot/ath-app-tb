<script setup>
import InfoVertical from '../components/InfoVertical.vue';
</script>

<template>

<div id="track">

    <svg id="track_svg" viewBox="0 0 500 260"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid">

        <g stroke-width="1px" fill="none">
        <path d="M 125 250 A 122.5 122.5 0 0 1 125 5"/>
        <path d="M 125 5 L 375 5"/>
        <path d="M 375 5 A 122.5 122.5 0 0 1 375 250"/>
        <path d="M 45 250 L 375 250"/>
        </g>

        <g stroke-width="0.5px" fill="none">
        <path d="M 125 245 A 115 115 0 0 1 125 10"/>
        <path d="M 125 10 L 375 10"/>
        <path d="M 375 10 A 117.5 117.5 0 0 1 375 245"/>
        <path d="M 45 245 L 375 245"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path id="path_ath1" d="M 125 240 A 107.5 107.5 0 0 1 125 15 M 125 15 L 375 15 M 375 15 A 112.5 112.5 0 0 1 375 240 M 45 240 L 375 240"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 235 A 100 100 0 0 1 125 20"/>
        <path d="M 125 20 L 375 20"/>
        <path d="M 375 20 A 107.5 107.5 0 0 1 375 235"/>
        <path d="M 45 235 L 375 235"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 230 A 92.5 92.5 0 0 1 125 25"/>
        <path d="M 125 25 L 375 25"/>
        <path d="M 375 25 A 102.5 102.5 0 0 1 375 230"/>
        <path d="M 45 230 L 375 230"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 225 A 85 85 0 0 1 125 30"/>
        <path d="M 125 30 L 375 30"/>
        <path d="M 375 30 A 97.5 97.5 0 0 1 375 225"/>
        <path d="M 45 225 L 375 225"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 220 A 77.5 77.5 0 0 1 125 35"/>
        <path d="M 125 35 L 375 35"/>
        <path d="M 375 35 A 92.5 92.5 0 0 1 375 220"/>
        <path d="M 45 220 L 375 220"/>
        </g>
        <g stroke-width="0.5px" fill="none">
        <path d="M 125 215 A 70 70 0 0 1 125 40"/>
        <path d="M 125 40 L 375 40"/>
        <path d="M 375 40 A 87.5 87.5 0 0 1 375 215"/>
        <path d="M 45 215 L 375 215"/>
        </g>

        <g stroke-width="1px" fill="none">
        <path d="M 125 210 A 62.5 62.5 0 0 1 125 45"/>
        <path d="M 125 45 L 375 45"/>
        <path d="M 375 45 A 82.5 82.5 0 0 1 375 210"/>
        <path d="M 45 210 L 375 210"/>
        </g>

        <g stroke-width="1px" fill="none">
        <path d="M 45 210 L 45 250" />

        <!-- Start 100m -->
        <path d="M 80 210 L 80 250" />
        </g>

    </svg>
    <p class="track_info">Athlete Name</p>
    <InfoVertical text='test' legend='legend'></InfoVertical>
</div>

<div class="slidecontainer">
    <input type="range" min="1" max="100" value="20" class="slider" id="range">
</div>


</template>



<style scoped>

#track {
    position: relative;
}

g > path  {
    stroke: var(--option_dark);
}

p.track_info {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.slidecontainer {
    
    width: 100%;
    margin-top: 10px;

}

.slider {
    overflow: hidden;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 25px;
    border: 2px solid;
    border-color: var(--option_dark);
    border-radius: 3.5px;

    background-image:linear-gradient(to right, var(--option) 10%, var(--primary) 10% 100%);
    background-repeat: repeat-x;
    background-position-y: center;
    background-position-x: 1px;
    background-size: 8px 28px;

    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
}


.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 6px;
    height: 24px;
    border-radius: 3.5px;
    background: #C23A30;
    cursor: pointer;
    box-shadow: -407px 0 0 400px #C23A3060;
}

@media (min-width: 600px) {
        .slidecontainer {
            transform: translateY(150%) rotate(-90deg);
        }

        .slider {
            width: 250px;
        }
    }
</style>