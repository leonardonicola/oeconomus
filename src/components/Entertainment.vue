<template>
  <div class="row justify-center items-center">
    <div class="text-h3 col-10 q-mt-xl text-weight-bold">Entertainment</div>
    <div class="row q-gutter-md q-my-lg col-10">
      <div class="overflow-hidden bg-grey-3 col-2" style="border-radius: 15px;" v-for="(expense, id) in entertainment.historic" :key="id">
        <div class="text-h5 bg-red-13 q-pa-md text-white text-weight-bold">{{ expense.name }}</div>
        <div class="text-h6 q-py-lg q-px-md">{{ formatted(expense.value) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useExpenseStore } from '../stores/expenses'

const expense = useExpenseStore()

const {entertainment} = storeToRefs(expense)

function formatted(val){
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
</script>
