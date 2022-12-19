<template>
  <div class="row justify-center">
    <Header />
    <Chart />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Header from '../components/Header.vue';
const Chart = defineAsyncComponent(() => import('../components/Chart.vue'))
</script>
