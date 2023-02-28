<template>
  <q-page class="row justify-center col-12">
    <q-dialog @hide="resetEditValues" v-model="openExpenseInfos">
      <q-card flat class="bg-grey-1" style="width: 400px; max-width: 80vw">
        <q-card-section :class="dynamicClass()" class="text-white">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h4 text-weight-bolder">
                {{
                  expenseStore[route.params.expense].historic[expenseId].name
                }}
              </div>
              <div class="text-subtitle2">{{ route.params.expense }}</div>
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
                {{
                  formatted(
                    expenseStore[route.params.expense].historic[expenseId].value
                  )
                }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h5 text-weight-bold">
                <q-icon name="calendar_month" /> Date:
              </div>
              <div class="text-body1">
                {{
                  expenseStore[route.params.expense].historic[expenseId].date
                }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h5 text-weight-bold">
                <q-icon name="payments" /> Payment:
              </div>
              <div class="text-body1 text-capitalize">
                {{
                  expenseStore[route.params.expense].historic[expenseId].payment
                }}
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
                :disable="!expenseEditValue && !expenseEditName"
                @click="applyEdit"
                class="q-mt-xl"
                color="blue"
                >APPLY</q-btn
              >
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>

    <div class="col-10">
      <div class="text-h3 col-12 q-mt-xl text-weight-bold">
        {{ route.params.expense.toUpperCase() }}
      </div>
      <q-list
        class="row q-gutter-lg q-my-lg"
        v-if="expenseStore[route.params.expense].historic.length > 0"
      >
        <q-item
          clickable
          @click="openExpenseInfosFn(index)"
          class="q-pa-none col-xs-10 col-sm-6 col-md-2 overflow-hidden"
          style="border-radius: 15px"
          v-for="(expense, index) in expenseStore[route.params.expense].historic"
          :key="index"
        >
          <q-item-section
            :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'"
            top
          >
            <q-item-label
              header
              :class="dynamicClass()"
              class="text-h5 q-pa-md text-white text-weight-bold"
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
        Oops, no {{ route.params.expense }} expenses to list!
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
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
const route = useRoute()

//Formata os valores para disponibilizar na tela
function formatted(val) {
  return val.toLocaleString('pt-BR', {minimumFractionDigits: 0, style: 'currency', currency: 'BRL'})
}

//Função que retorna a classe dinâmica de acordo com a despesa
function dynamicClass() {
  switch (route.params.expense) {
    case 'essentials':
      return 'bg-deep-purple-4'
    case 'entertainment':
      return 'bg-red-13'
    case 'health':
      return 'bg-teal-4'
  }
}

function openExpenseInfosFn(id) {
  openExpenseInfos.value = !openExpenseInfos.value
  expenseId.value = id
  expenseEditValue.value = expenseStore[route.params.expense].historic[id].value
  expenseEditName.value = expenseStore[route.params.expense].historic[id].name
}

function removeExpense() {
  const paymentType =
    expenseStore[route.params.expense].historic[expenseId.value].payment
  const expenseValue =
    expenseStore[route.params.expense].historic[expenseId.value].value
  expenseStore.removeExpense({
    id:expenseId.value,
    category: route.params.expense,
    payment: paymentType,
    value: expenseValue
    }
  )
  openExpenseInfos.value = false
}

function resetEditValues() {
  expenseEditName.value = null
  expenseEditValue.value = 0
}

function applyEdit() {
  expenseStore.applyChanges({
    id: expenseId.value,
    category: route.params.expense,
    newName: expenseEditName.value,
    newValue: expenseEditValue.value,
  })
  openExpenseInfos.value = false
}
</script>
