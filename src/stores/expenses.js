import { defineStore } from 'pinia'
import { useCardStore } from './card'
import { useQuasar } from 'quasar'
const $q = useQuasar()

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    walletBalance: 700,
    entertainment: {
      historic: [
        {
          name: 'Pub with boys',
          value: 150,
          date: '10 June',
          payment: 'credit',
        },
      ],
    },
    health: {
      historic: [
        {
          name: 'Laroche cream',
          value: 350,
          date: '21 February',
          payment: 'credit',
        },
        { name: 'Grocery', value: 200, date: '01 January', payment: 'wallet' },
      ],
    },
    essentials: {
      historic: [
        { name: 'PSN Plus', value: 150, date: '05 July', payment: 'credit' },
      ],
    },
  }),
  getters: {
    balanceWithFilter: (state) => {
      let val = (state.walletBalance / 1).toFixed(2).replace('.', ',')
      return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    },
    total: (state) => (expense) => {
      let val = state[expense].historic.reduce(
        (acumulador, { value }) => acumulador + value,
        0
      )
      return val
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
      })
      this.debitBalance(expense.origin, expense.value)
    },
    addFunds(origin, value) {
      const card = useCardStore()
      switch (origin) {
        case 'credit card payment':
          card.cardBalance -= value
          break
        case 'wallet':
          this.walletBalance += value
          break
        case 'credit':
          let cardCredit = card.cardBalance
          if (cardCredit - value <= 0) {
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
      const card = useCardStore()
      const expenseStoreValue = this[category].historic[expenseId].value
      const paymentType = this[category].historic[expenseId].payment


      if (newValue > expenseStoreValue) {
        let newIsBigger =  newValue - this[category].historic[expenseId].value
        switch (paymentType) {
          case 'wallet':
            this.walletBalance -= newIsBigger
            break
          case 'credit':
            card.cardBalance += newIsBigger
            break
        }
      } else if (newValue < expenseStoreValue) {
        let newIsLower = this[category].historic[expenseId].value - newValue
        switch (paymentType) {
          case 'wallet':
            this.walletBalance += newIsLower
            break
          case 'credit':
            card.cardBalance -= newIsLower
            break
        }
      }

      this[category].historic[expenseId].name = newName
      this[category].historic[expenseId].value = newValue
    },
  },
})
