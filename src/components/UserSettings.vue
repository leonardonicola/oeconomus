<template>
  <div class="row justify-center col-12">
    <div class="text-h3 col-10 q-my-xl text-weight-bold">
      Change your profile
    </div>
    <div class="row col-10 q-my-lg">
      <div class="col-12 col-md-4 q-mr-xl">
        <div class="text-h5 text-weight-bold q-mb-lg">Card infos</div>
        <q-form @submit="applyChangesCard">
          <div class="text-h6">Name</div>
          <q-input
            dense
            outlined
            lazy-rules
            class="q-mt-md"
            :rules="[(val) => !!val || 'Insert a name']"
            v-model="editCardName"
          ></q-input>

          <div class="text-h6">Number</div>
          <q-input
            v-model="editCardNumber"
            dense
            outlined
            lazy-rules
            :rules="[
              (val) => !!val || 'Insert a valid number',
              (val) => val.length === 16 || 'Insert a valid number',
            ]"
            class="q-mt-md"
          ></q-input>

          <div align="right" class="text-white q-mt-lg">
            <q-btn
              class="bg-primary"
              push
              :disable="!editCardName || !editCardNumber"
              label="APPLY"
              type="submit"
            />
          </div>
        </q-form>
      </div>

      <div class="col-md-4 col-12">
        <div class="text-h5 text-weight-bold q-mb-lg">Budget</div>
        <q-form @submit="applyChangesBudget">
          <div class="text-h6 q-mb-md">Price</div>
          <CurrencyInput
            v-model="budgetPrice"
            :options="{
              currency: 'BRL',
              currencyDisplay: 'symbol',
              hideCurrencySymbolOnFocus: true,
              hideGroupingSeparatorOnFocus: false,
              hideNegligibleDecimalDigitsOnFocus: false,
              autoDecimalDigits: true,
            }"
          />
          <div align="right" class="text-white q-mt-lg">
            <q-btn
              class="bg-primary"
              push
              :disable="!budgetPrice"
              label="APPLY"
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCardStore } from '../stores/card'
import { useUserStore } from '../stores/user'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import CurrencyInput from './CurrencyInput.vue'
const card = useCardStore()
const user = useUserStore()
const $q = useQuasar()

const budgetPrice = ref(user.budget)
const editCardName = ref(card.cardName)
const editCardNumber = ref(card.cardNumber)

function applyChangesCard() {
  card.changeCardInfos(editCardName.value, editCardNumber.value)
  $q.notify({
    type: 'positive',
    message: 'Card infos changed successfully',
  })
}

function applyChangesBudget() {
  user.changeBudgetPrice(budgetPrice.value)
  $q.notify({
    type: 'positive',
    message: 'Budget changed successfully',
  })
}
</script>
