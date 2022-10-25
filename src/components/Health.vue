<template>
  <div class="row justify-center items-center">
    <div class="text-h3 col-10 q-mt-xl text-weight-bold">Health</div>
    <div class="row q-gutter-md q-my-lg col-10">
      <div class="overflow-hidden bg-grey-3 col-2" style="border-radius: 15px;" v-for="(expense, id) in health.historic" :key="id">
        <div class="text-h5 bg-teal-4 q-pa-md text-white text-weight-bold">{{ expense.name }}</div>
        <div class="text-h6 q-py-lg q-px-md">{{ formatted(expense.value) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useExpenseStore } from '../stores/expenses'

const expense = useExpenseStore()

const {health} = storeToRefs(expense)

function formatted(val){
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
</script>
