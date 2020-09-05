import Vue from 'vue'
import Vuex from 'vuex'
import da from "element-ui/src/locale/lang/da";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    balance: 0,
    posiList: [],
    orderList: [],
    tradeList: []
  },
  mutations: {
    updateBalance(state, data){
      state.balance = data;
    },
    updatePosi(state, data){
      state.posiList = data;
    },
    updateOrder(state, data){
      state.orderList = data;
    },
    updateTrade(state, data){
      state.tradeList = data;
    }
  },
  // 和mutation差不多，不过是异步
  // actions: {
  // },
  // 和state差不多
  // modules: {
  // }
})
