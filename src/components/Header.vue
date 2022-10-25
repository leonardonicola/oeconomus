<template>
  <q-header style="min-height: 200px" class="bg-white text-black q-ma-md">
    <div
      :class="$q.screen.lt.md ? '' : 'justify-center'"
      class="row items-center"
    >
      <div :class="$q.screen.lt.md ? 'q-my-md' : 'absolute-left'">
        <q-btn
          flat
          round
          size="1.5em"
          icon="menu"
          aria-label="Menu"
          @click="emit('toggleLeftDrawer')"
        />
      </div>

      <div class="col-12 col-md-6">
        <div class="text-h5 text-grey-9 text-weight-bold">Wallet balance</div>
        <div class="text-h4 text-primary text-weight-bolder">
          {{ this.expenses.balanceWithFilter }}
        </div>
      </div>

      <div
        class="bg-primary text-white q-pa-lg col-6"
        style="border-radius: 30px; width: 300px"
      >
        <div class="q-my-sm text-h6 text-weight-bold">
          {{ this.card.balanceWithFilter }}
        </div>
        <div class="text-body1 text-grey-6 text-weight-bold">
          <q-icon
            size="sm"
            class="fab fa-cc-mastercard q-mr-sm"
            color="white"
          />
          **** 1023
        </div>
        <div class="text-weight-light q-mt-lg">Leonardo Nicola</div>
      </div>
    </div>
  </q-header>
</template>
<script setup>
import { useExpenseStore } from '../stores/expenses'
import { useCardStore } from '../stores/card'
import { defineEmits } from 'vue'

const emit = defineEmits(['toggleLeftDrawer'])

const expenses = useExpenseStore()
const card = useCardStore()
</script>
