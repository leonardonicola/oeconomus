<template>
  <q-page class="flex flex-center">
    <VueApexCharts
      :width=500
      type="donut"
      :options="chartOptions"
      :series="series"
      class="q-my-xl"
    />
  </q-page>
</template>

<script setup>
import { useExpenseStore } from '../stores/expenses'
import VueApexCharts from 'vue3-apexcharts'
import { ref } from 'vue';

const expenses = useExpenseStore()

const chartOptions = {
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: 'light',
    palette: 'palette7',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
        },
      },
    },
  ],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom'
        },
      },
    },
  ],
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
const series = ref([expenses.total('entertainment'), expenses.total('health'), expenses.total('essentials')])

function formatCurrency(val) {
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
</script>
