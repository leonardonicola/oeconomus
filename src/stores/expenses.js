import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { useStorage } from '@vueuse/core'

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    walletBalance: useStorage('walletBalance', 700),
    entertainment: useStorage('entertainment', {
      historic: [
        {
          name: 'Example',
          value: 20,
          date: '10 June',
          payment: 'wallet',
        },
      ],
    }),
    health: useStorage('health', {
      historic: [],
    }),
    essentials: useStorage('essentials', {
      historic: [],
    }),
  }),
  getters: {
    balanceWithFilter: (state) => {
      return state.walletBalance.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
    total: (state) => {
      return (expense) => {
        let val = state[expense].historic.reduce(
          (acumulador, { value }) => acumulador + value,
          0
        )
        return val
      }
    },
  },
  actions: {
    debitBalance(origin, value) {
      const card = useCardStore()
      origin === 'credit card'
        ? (card.cardBalance += value)
        : (this.walletBalance -= value)
    },
    addExpense(expense) {
      this[expense.type].historic.push({
        name: expense.name,
        value: expense.value,
        date: expense.date,
        payment: expense.origin,
      })
      this.debitBalance(expense.origin, expense.value)
    },
    addFunds(origin, value) {
      const card = useCardStore()
      switch (origin) {
        case 'wallet':
          this.walletBalance += value
          break
        case 'credit card':
          let result = card.cardBalance - value
          //Teste para quando remover uma despesa ela não negativar a conta de crédito
          if (result <= 0) {
            card.cardBalance = 0
          } else {
            card.cardBalance -= value
          }
          break
      }
    },
    removeExpense({ id, category, payment, value }) {
      this.addFunds(payment, value)
      this[category].historic.splice(id, 1)
    },
    applyChanges({ id, category, newName, newValue }) {
      const expenseStoreValue = this[category].historic[id].value
      const paymentType = this[category].historic[id].payment

      if (newValue > expenseStoreValue) {
        let newIsBigger = newValue - this[category].historic[id].value
        this.debitBalance(paymentType, newIsBigger)
      } else if (newValue < expenseStoreValue) {
        let newIsLower = this[category].historic[id].value - newValue
        this.addFunds(paymentType, newIsLower)
      }

      this[category].historic[id].name = newName
      this[category].historic[id].value = newValue
    },
  },
})
