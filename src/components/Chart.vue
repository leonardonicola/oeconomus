<template>
  <div class="row col-md-10 col-12 justify-center">
    <VueApexCharts
      height="350"
      type="donut"
      :options="chartOptionsDonut"
      :series="series"
      class="q-mt-xl col-md-6 col-10"
      ref="donut"
    />
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useExpenseStore } from '../stores/expenses'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { watch } from 'vue'

const $q = useQuasar()
const expenses = useExpenseStore()

watch(
  () => $q.dark.isActive,
  (val) => {
    if (val) {
      chartOptionsDonut.chart.background.value = '#121212'
    } else {
      chartOptionsDonut.chart.background.value = '#FFF'
    }
  }
)
const chartOptionsDonut = {
  dataLabels: {
    enabled: false,
  },
  chart: {
    animations: {
      enabled: false,
      dynamicAnimation: {
        enabled: false,
      },
    },
    background: ref('#121212'),
  },
  theme: {
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
              let val = w.globals.seriesTotals
                .reduce((a, b) => {
                  return a + b
                }, 0)
                .toLocaleString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

              return `R$ ${val}`
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
const series = [
  expenses.total('entertainment'),
  expenses.total('health'),
  expenses.total('essentials'),
]

function formatCurrency(val) {
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
</script>
