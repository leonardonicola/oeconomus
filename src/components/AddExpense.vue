<template>
  <div class="row justify-center col-12">
    <div class="row justify-center col-10">
      <div class="text-h3 col-12 q-mt-xl text-weight-bold">Add a expense</div>
      <div style="min-width: 300px" class="col-4 q-mt-xl">
        <q-form ref="addExpenseForm" @submit="addExpenseFn" class="q-gutter-md">
          <div class="text-h6">Name</div>
          <q-input
            outlined
            dense
            v-model="expenseName"
            autofocus
            lazy-rules
            :rules="[(val) => !!val || 'Insert at least a name']"
          />

          <div class="text-h6">Value</div>
          <CurrencyInput
            v-model="expenseValue"
            :options="{
              currency: 'BRL',
              currencyDisplay: 'symbol',
              hideCurrencySymbolOnFocus: true,
              hideGroupingSeparatorOnFocus: false,
              hideNegligibleDecimalDigitsOnFocus: false,
              autoDecimalDigits: true,
            }"
          />

          <div class="text-h6">Type</div>
          <q-select
            dense
            outlined
            v-model="expenseType"
            :options="options"
            lazy-rules
            :rules="[(val) => !!val || 'Select a type']"
          />

          <div class="text-h6">Origin</div>
          <q-select
            dense
            outlined
            v-model="expenseOrigin"
            :options="paymentOptions"
            lazy-rules
            :rules="[(val) => !!val || 'Select from where it should discount']"
          />
          <div align="right" class="text-white">
            <q-btn class="bg-primary" label="ADD" type="submit" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useExpenseStore } from '../stores/expenses'
import { date } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { ref } from 'vue'
const CurrencyInput = defineAsyncComponent(() => import('./CurrencyInput.vue'))

const expenseType = ref(null)
const expenseValue = ref(0)
const expenseOrigin = ref(null)
const expenseName = ref(null)
const expense = useExpenseStore()
const addExpenseForm = ref(null)

const paymentOptions = ['Credit Card', 'Wallet']
const options = ['Entertainment', 'Health', 'Essentials']

function addExpenseFn() {
  const timeStamp = Date.now()
  const formattedTime = date.formatDate(timeStamp, 'DD MMMM')
  expense.addExpense({
    name: expenseName.value,
    value: expenseValue.value,
    type: expenseType.value.toLowerCase(),
    origin: expenseOrigin.value.toLowerCase(),
    date: formattedTime,
  })
  resetExpensesValues()
}

function resetExpensesValues() {
  expenseName.value = null
  expenseType.value = null
  expenseOrigin.value = null
  expenseValue.value = 0
  addExpenseForm.value.resetValidation()
}
</script>
