<script setup>
import { onBeforeMount, ref } from 'vue'
import { useExpenseStore } from 'src/stores/expenses'
import { useCardStore } from 'src/stores/card'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import { defineAsyncComponent } from 'vue'
const CurrencyInput = defineAsyncComponent(() =>
  import('../components/CurrencyInput.vue')
)
const leftDrawerOpen = ref(true)
const openAddExpense = ref(false)
const openAddFunds = ref(false)
const options = ['Entertainment', 'Health', 'Essentials']
const originOptions = ['Credit Card', 'Wallet']
const expenseType = ref(null)
const expenseValue = ref(0)
const expenseOrigin = ref(null)
const expenseName = ref(null)
const fundsOptions = ['Credit Card Payment', 'Wallet']
const fundsOrigin = ref(null)
const fundsValue = ref(0)
const expense = useExpenseStore()

const $q = useQuasar()

onBeforeMount(() => {
  if ($q.screen.lt.md) {
    leftDrawerOpen.value = false
  }
})

function resetExpensesValues() {
  openAddExpense.value = false
  expenseName.value = null
  expenseType.value = null
  expenseOrigin.value = null
  expenseValue.value = 0
}

function resetFundsValues() {
  openAddFunds.value = false
  fundsValue.value = 0
  fundsOrigin.value = null
}

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

function addFundsFn() {
  const card = useCardStore()
  if (
    fundsOrigin.value.toLowerCase() === 'credit card payment' &&
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

function openAddExpenseFn() {
  openAddExpense.value = !openAddExpense.value
}

function openAddFundsFn() {
  openAddFunds.value = !openAddFunds.value
}

function openDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-dialog v-model="openAddExpense">
      <q-card style="min-width: 300px">
        <q-card-section>
          <q-form @submit="addExpenseFn" class="q-gutter-md">
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
              :options="originOptions"
              lazy-rules
              :rules="[
                (val) => !!val || 'Select from where it should discount',
              ]"
            />
            <q-card-actions align="right" class="text-white">
              <q-btn class="bg-primary" label="ADD" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openAddFunds">
      <q-card style="min-width: 300px">
        <q-card-section>
          <q-form @submit="addFundsFn" class="q-gutter-md">
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
              :rules="[
                (val) => !!val || 'Select from where it should increment',
              ]"
            />
            <q-card-actions align="right" class="text-white">
              <q-btn class="bg-primary" label="ADD" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-btn flat icon="menu" size="xl" class="q-ma-md" @click="openDrawer" />

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      side="right"
      mini
      :mini-width="180"
      class="q-pa-lg"
    >
      <q-list class="row text-center">
        <q-item
          clickable
          v-ripple
          class="bg-purple-9 q-mb-md col-12"
          :class="$q.screen.lt.md ? 'justify-center' : ''"
          style="border-radius: 20px"
          @click="openAddExpenseFn"
        >
          <div class="q-px-sm q-py-sm text-body1 text-weight-bold text-white">
            + ADD <br />
            EXPENSE
          </div>
        </q-item>

        <q-item
          clickable
          v-ripple
          class="bg-teal q-mb-lg col-12"
          :class="$q.screen.lt.md ? 'justify-center' : ''"
          style="border-radius: 20px"
          @click="openAddFundsFn"
        >
          <div class="q-px-sm q-py-sm text-body1 text-weight-bold text-white">
            + ADD <br />
            FUNDS
          </div>
        </q-item>

        <div class="text-h5 text-weight-bold q-mb-lg">
          Expenses per category
        </div>
        <q-item
          to="/app/health"
          active-class="bg-teal-1"
          style="border-radius: 15px"
          class="col-6 col-md-12 justify-center"
        >
          <div class="bg-teal-2" style="border-radius: 7px">
            <q-icon name="favorite" class="q-pa-md" color="teal" size="sm" />
          </div>
        </q-item>

        <q-item
          to="/app/essentials"
          active-class="bg-deep-purple-1"
          style="border-radius: 15px"
          class="col-6 col-md-12 justify-center"
        >
          <div class="bg-deep-purple-3" style="border-radius: 7px">
            <q-icon
              name="shopping_basket"
              class="q-pa-md"
              color="deep-purple"
              size="sm"
            />
          </div>
        </q-item>
        <q-item
          to="/app/entertainment"
          active-class="bg-red-1"
          class="col-6 col-md-12 justify-center"
          style="border-radius: 15px"
        >
          <div class="bg-red-11" style="border-radius: 7px">
            <q-icon
              size="sm"
              name="confirmation_number"
              class="q-pa-md"
              color="red-13"
            />
          </div>
        </q-item>
        <q-item
          to="/app"
          exact
          active-class="bg-orange-1"
          class="col-6 col-md-12 justify-center"
          style="border-radius: 15px"
        >
          <div class="bg-orange-2" style="border-radius: 7px">
            <q-icon
              name="home"
              size="sm"
              class="q-pa-md"
              color="orange"
            />
          </div>
        </q-item>
        <q-item
          to="/"
          active-class="bg-red-1"
          class="col-12 justify-center q-mt-xl"
          style="border-radius: 15px"
        >
          <div class="bg-red-2" style="border-radius: 7px">
            <q-icon name="logout" size="sm" class="q-pa-md" color="red" />
          </div>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
