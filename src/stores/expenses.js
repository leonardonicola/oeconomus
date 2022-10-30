import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { useStorage } from '@vueuse/core'

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    walletBalance: useStorage('walletBalance', 700),
    entertainment: useStorage('entertainment', {
      historic: [
        {
          name: 'Cinema',
          value: 20,
          date: '10 June',
          payment: 'wallet',
        },
      ],
    }),
    health: useStorage('health', {
      historic: [
        {
          name: 'Laroche cream',
          value: 350,
          date: '21 February',
          payment: 'credit card',
        },
        { name: 'Grocery', value: 200, date: '01 January', payment: 'wallet' },
      ],
    }),
    essentials: useStorage('essentials', {
      historic: [
        {
          name: 'PSN Plus',
          value: 150,
          date: '05 July',
          payment: 'credit card',
        },
      ],
    }),
  }),
  getters: {
    balanceWithFilter: (state) => {
      let val = (state.walletBalance / 1).toFixed(2).replace('.', ',')
      return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
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
      switch (origin) {
        case 'credit card':
          card.cardBalance += value
          break
        case 'wallet':
          this.walletBalance -= value
          break
      }
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
          if (result <= 0) {
            card.cardBalance = 0
          } else {
            card.cardBalance -= value
          }
          break
      }
    },
    removeExpense(expenseId, category, payment, value) {
      this.addFunds(payment, value)
      this[category].historic.splice(expenseId, 1)
    },
    applyChanges(expenseId, category, newName, newValue) {
      const expenseStoreValue = this[category].historic[expenseId].value
      const paymentType = this[category].historic[expenseId].payment

      if (newValue > expenseStoreValue) {
        let newIsBigger = newValue - this[category].historic[expenseId].value
        this.debitBalance(paymentType, newIsBigger)
      } else if (newValue < expenseStoreValue) {
        let newIsLower = this[category].historic[expenseId].value - newValue
        this.addFunds(paymentType, newIsLower)
      }

      this[category].historic[expenseId].name = newName
      this[category].historic[expenseId].value = newValue
    },
  },
})
