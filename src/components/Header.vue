<template>
  <div class="row col-12 items-center justify-center q-my-xl">
    <div class="col-10 col-md-6 q-my-md text-center">
      <div class="text-h5 text-weight-bold">Wallet balance</div>
      <div class="text-h4 text-primary text-weight-bolder">
        {{ expenses.balanceWithFilter }}
      </div>

      <div class="text-h5 text-weight-bold q-mt-lg">Your budget</div>
      <div :class="textClass" class="text-h4 text-weight-bolder">
        {{ user.budgetFiltered }}
        <q-icon v-if="textClass === 'text-red-13'" name="error_outline">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10,10]">
            Your budget is lower than your actual expenses
          </q-tooltip>
        </q-icon>
      </div>
    </div>

    <div class="row col-md-4 col-10 justify-center">
      <q-item
        class="column bg-primary text-white q-pa-lg"
        style="border-radius: 30px; width: 300px"
      >
        <div class="q-my-sm text-h6 text-weight-bold">
          {{ card.balanceWithFilter }}
        </div>
        <div class="text-body1 text-grey-6 text-weight-bold">
          <q-icon name="credit_card" size="sm" color="white" />
          {{ formattedCardNumber(card.cardNumber) }}
        </div>
        <div class="text-weight-light q-mt-lg">{{ card.cardName }}</div>
      </q-item>
    </div>
  </div>
</template>
<script setup>
import { useExpenseStore } from '../stores/expenses'
import { useCardStore } from '../stores/card'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const expenses = useExpenseStore()
const card = useCardStore()
const user = useUserStore()
const textClass = ref(null)
const { budget } = storeToRefs(user)
const total =
  expenses.total('entertainment') +
  expenses.total('health') +
  expenses.total('essentials')

function formattedCardNumber(val) {
  const regex = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm
  const subst = `**** `
  return val.replace(regex, subst)
}

onMounted(() => {
  budget.value > total
    ? (textClass.value = 'text-green')
    : (textClass.value = 'text-red-13')
})
</script>
