import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useCardStore = defineStore('card', {
  state: () => ({
    cardBalance: useStorage('cardBalance', 650),
    cardName: useStorage('cardName', 'Tyler Okonma'),
    cardNumber: useStorage('cardNumber', '2713373612758394'),
  }),
  getters: {
    balanceWithFilter: (state) => {
      let val = (state.cardBalance / 1).toFixed(2).replace('.', ',')
      return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    },
  },
  actions: {
    changeCardInfos(name, number) {
      this.cardName = name
      this.cardNumber = number
    },
  },
})
