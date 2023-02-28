import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    budget: useStorage('budget', 500),
  }),
  getters: {
    budgetFiltered: (state) => {
      let val = (state.budget / 1).toFixed(2).replace('.', ',')
      return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    },
  },
  actions: {
    changeBudgetPrice(price) {
      this.budget = price
    },
  },
})
