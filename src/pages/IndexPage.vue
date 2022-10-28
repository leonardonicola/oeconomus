<template>
  <div class="row justify-center">
    <Header />
    <div class="row col-md-10 col-12 justify-center">
      <VueApexCharts
        height="350"
        type="donut"
        :options="chartOptionsDonut"
        :series="series"
        class="q-mt-xl col-md-6 col-10"
      />
    </div>
  </div>
</template>

<script setup>
import { useExpenseStore } from '../stores/expenses'
import {defineAsyncComponent} from 'vue'
import { ref } from 'vue'
const VueApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'))
const Header = defineAsyncComponent(() => import('../components/Header.vue'))

const expenses = useExpenseStore()

const chartOptionsDonut = {
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: 'light',
    palette: 'palette7',
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 300,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    show: false,
  },
  labels: ['Entertainment', 'Health', 'Essentials'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          value: {
            formatter: formatCurrency,
          },
          show: true,
          total: {
            show: true,
            fontWeight: 'bold',
            formatter: function (w) {
              return `R$ ${w.globals.seriesTotals
                .reduce((a, b) => {
                  return a + b
                }, 0)
                .toLocaleString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
            },
          },
        },
      },
    },
  },
  yaxis: {
    labels: {
      formatter: formatCurrency,
    },
  },
}
const series = ref([
  expenses.total('entertainment'),
  expenses.total('health'),
  expenses.total('essentials'),
])

function formatCurrency(val) {
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
</script>
