<script setup>
import '../style.css';

const props = defineProps({
  title: String,
  results: Array
})

</script>

<template>
    <div id="info_container">
        <h2>{{ title }}</h2>
        <ul>
            <li v-for="result in results">
                 <span>{{ result.meeting }}</span>
                 <span>{{ result.date }}</span>
                 <span>{{ result.race }}</span>
                 <span class="primary">{{ result.result }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    #info_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        min-width: 100px;
    }

    h2 {
        font-size: 16px;
        width: 100%;
        margin: 20px 0 10px 0;
    }
  
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
    }

    ul > li {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        gap: 12px;
    }

    span {
        font-size: 14px;
    }

    span:nth-of-type(1) {
        flex: 0.4;
    }

    span:nth-of-type(2) {
        flex: 0.3;
    }

    span:nth-of-type(3) {
        flex: 0.2;
    }

    span:nth-of-type(4) {
        flex: 0.1;
        font-weight: bold;
    }
    span.primary{
        color: var(--accent);
    }
    
</style>
