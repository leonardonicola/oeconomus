<template>
  <div class="row justify-center col-12">
    <div class="row justify-center col-10">
      <div class="text-h3 col-12 q-mt-xl text-weight-bold">Add funds or make a payment</div>
      <div style="min-width: 300px" class="col-4 q-mt-xl">
        <q-form ref="addFundsForm" @submit="addFundsFn" class="q-gutter-md">
          <div class="text-h6">Value</div>
          <CurrencyInput
            v-model="fundsValue"
            :options="{
              currency: 'BRL',
              currencyDisplay: 'symbol',
              hideCurrencySymbolOnFocus: true,
              hideGroupingSeparatorOnFocus: false,
              hideNegligibleDecimalDigitsOnFocus: false,
              autoDecimalDigits: true,
            }"
          />

          <div class="text-h6">Origin</div>
          <q-select
            dense
            outlined
            v-model="fundsOrigin"
            :options="fundsOptions"
            lazy-rules
            :rules="[(val) => !!val || 'Select from where it should increment']"
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
import { ref } from 'vue'
import { useExpenseStore } from '../stores/expenses'
import { useCardStore } from '../stores/card'
import { defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'
const CurrencyInput = defineAsyncComponent(() => import('./CurrencyInput.vue'))

const expense = useExpenseStore()
const fundsOptions = ['Credit Card', 'Wallet']
const fundsOrigin = ref(null)
const fundsValue = ref(0)
const addFundsForm = ref(null)
const $q = useQuasar()

function resetFundsValues() {
  fundsValue.value = 0
  fundsOrigin.value = null
  addFundsForm.value.resetValidation()
}

function addFundsFn() {
  const card = useCardStore()
  if (
    fundsOrigin.value.toLowerCase() === 'credit card' &&
    fundsValue.value > card.cardBalance
  ) {
    $q.notify({
      type: 'warning',
      message: "Your payment can't be higher than your credit card bill",
    })
  } else {
    expense.addFunds(fundsOrigin.value.toLowerCase(), fundsValue.value)
    resetFundsValues()
  }
}
</script>
