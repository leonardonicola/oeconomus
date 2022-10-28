<template>
  <div

  class="row col-12 items-start justify-center q-my-xl"
  >
    <div class="col-10 col-md-6 q-my-md text-center">
      <div class="text-h5 text-grey-9 text-weight-bold">Wallet balance</div>
      <div class="text-h4 text-primary text-weight-bolder">
        {{ expenses.balanceWithFilter }}
      </div>
    </div>

    <div class="row col-md-6 col-10 justify-center">
      <div
        class="bg-primary text-white q-pa-lg"
        style="border-radius: 30px; width: 300px"
      >
        <div class="q-my-sm text-h6 text-weight-bold">
          {{ card.balanceWithFilter }}
        </div>
        <div class="text-body1 text-grey-6 text-weight-bold">
          <q-icon name="credit_card" size="sm" color="white" />
          **** 1023
        </div>
        <div class="text-weight-light q-mt-lg">Leonardo Nicola</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useExpenseStore } from '../stores/expenses'
import { useCardStore } from '../stores/card'

const expenses = useExpenseStore()
const card = useCardStore()
</script>
