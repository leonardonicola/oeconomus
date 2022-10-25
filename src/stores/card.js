import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', {
  state: () => ({
    cardBalance: 1200,
  }),
  getters: {
    balanceWithFilter: (state) => {
      let val = (state.cardBalance/1).toFixed(2).replace('.', ',')
      return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    },
  },
  actions: {
    increment() {
      this.counter++
    },
  },
})