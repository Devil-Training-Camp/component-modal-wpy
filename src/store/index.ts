import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    addNum(state) {
      state.count++
    },
    subNum(state) {
      state.count--
    }
  }
})
