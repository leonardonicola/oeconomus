import { defineStore } from 'pinia'
import { useCardStore } from './card'

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    walletBalance: 700,
    entertainment: {
      historic: [
        { name: 'Pub with boys', value: 150 },
      ],
    },
    health: {
      historic: [
        { name: 'Laroche cream', value: 350 },
        { name: 'Grocery', value: 200 },
      ],
    },
    essentials: {
      historic: [{ name: 'PSN Plus', value: 150 }],
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
    addExpense(expense) {
      const card = useCardStore()
      this[expense.type].historic.push({
        name: expense.name,
        value: expense.value,
      })
      switch(expense.origin){
        case 'credit card':
          card.cardBalance += expense.value
          break;
        case 'wallet':
          this.walletBalance -= expense.value
          break;
      }
    },
    addFunds(funds){
      const card = useCardStore()
      switch(funds.origin){
        case 'credit card payment':
          card.cardBalance -= funds.value
          break;
        case 'wallet':
          this.walletBalance += funds.value
          break;
      }
    }
  },
})
