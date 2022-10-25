import { defineStore } from 'pinia';

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    walletBalance: 700,
    entertainment:{
      value:150,
      historic:[]
    },
    health:{
      value:550,
      historic:[]
    },
    essentials:{
      value:50,
      historic:[]
    }
  }),
  getters: {
    balanceWithFilter: (state) => {
      let val = (state.walletBalance/1).toFixed(2).replace('.', ',')
      return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    },
  },
  actions: {

  },
});


