<template>
  <q-page class="row justify-center col-12">
    <q-dialog @hide="resetEditValues" v-model="openExpenseInfos">
      <q-card flat class="bg-grey-1" style="width: 400px; max-width: 80vw">
        <q-card-section class="bg-teal-4 text-white">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h4 text-weight-bolder">
                {{ health.historic[expenseId].name }}
              </div>
              <div class="text-subtitle2">Health</div>
            </div>
            <q-btn flat align="right" @click="removeExpense">REMOVE</q-btn>
          </div>
        </q-card-section>
        <q-separator />

        <q-tabs v-model="tab" class="text-black">
          <q-tab label="Infos" name="infos" />
          <q-tab label="Edit" name="edit" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="infos">
            <q-card-section>
              <div class="text-h5 text-weight-bold">
                <q-icon name="sell" /> Value:
              </div>
              <div class="text-body1">
                {{ formatted(health.historic[expenseId].value) }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h5 text-weight-bold">
                <q-icon name="calendar_month" /> Date:
              </div>
              <div class="text-body1">
                {{ health.historic[expenseId].date }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h5 text-weight-bold">
                <q-icon name="payments" /> Payment:
              </div>
              <div class="text-body1 text-capitalize">
                {{ health.historic[expenseId].payment }}
              </div>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="edit">
            <q-card-section>
              <div class="text-h5 text-weight-bold q-mb-md">
                <q-icon name="sell" /> Value:
              </div>
              <CurrencyInput
                v-model="expenseEditValue"
                :options="{
                  currency: 'BRL',
                  currencyDisplay: 'symbol',
                  hideCurrencySymbolOnFocus: true,
                  hideGroupingSeparatorOnFocus: false,
                  hideNegligibleDecimalDigitsOnFocus: false,
                  autoDecimalDigits: true,
                }"
              />
            </q-card-section>

            <q-card-section>
              <div class="text-h5 text-weight-bold q-mb-md">
                <q-icon name="tag" /> Name:
              </div>
              <q-input v-model="expenseEditName" outlined dense type="text" />
              <q-btn
                push
                :disable="!expenseEditValue || !expenseEditName"
                @click="applyEdit"
                class="q-mt-xl"
                color="teal-4"
                >APPLY</q-btn
              >
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>

    <div class="col-10">
      <div class="text-h3 col-12 q-mt-xl text-weight-bold">Health</div>
      <q-list class="row q-gutter-lg q-my-lg" v-if="health.historic.length > 0">
        <q-item
          clickable
          @click="openExpenseInfosFn(id)"
          class="q-pa-none col-xs-10 col-sm-6 col-md-2 overflow-hidden"
          style="border-radius: 15px"
          v-for="(expense, id) in health.historic"
          :key="id"
        >
          <q-item-section
            :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'"
            top
          >
            <q-item-label
              header
              class="text-h5 bg-teal-4 q-pa-md text-white text-weight-bold"
            >
              {{ expense.name }}
            </q-item-label>
            <q-item-label class="text-h6 q-py-lg q-px-md">
              {{ formatted(expense.value) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-h6 q-mt-xl text-italic text-weight-light" v-else>
        Oops, no Health expenses to list!
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useExpenseStore } from '../stores/expenses'
import { defineAsyncComponent } from 'vue'
const CurrencyInput = defineAsyncComponent(() =>
  import('../components/CurrencyInput.vue')
)
const openExpenseInfos = ref(false)
const expenseId = ref(null)
const expenseStore = useExpenseStore()
const expenseEditValue = ref(0)
const expenseEditName = ref(null)
const tab = ref('infos')

const { health } = storeToRefs(expenseStore)

function formatted(val) {
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

function openExpenseInfosFn(id) {
  openExpenseInfos.value = !openExpenseInfos.value
  expenseId.value = id
}

function removeExpense() {
  const paymentType = expenseStore['health'].historic[expenseId.value].payment
  const expenseValue = expenseStore['health'].historic[expenseId.value].value
  expenseStore.removeExpense(
    expenseId.value,
    'health',
    paymentType,
    expenseValue
  )
  openExpenseInfos.value = false
}

function resetEditValues() {
  expenseEditName.value = null
  expenseEditValue.value = 0
}

function applyEdit() {
  expenseStore.applyChanges(
    expenseId.value,
    'health',
    expenseEditName.value,
    expenseEditValue.value
  )
  openExpenseInfos.value = false
}
</script>
