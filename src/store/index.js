import Vue from 'vue'
import Vuex from 'vuex'
import { VuexPersistence } from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  storage: localStorage,
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dogs: []
  },
  getters: {
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    favoriteDog(state, addDog) {
      state.dogs.push(addDog)
    },
    deleteImgId(state, id) {
      state.dogs = state.dogs.filter(dog => dog.id !== id)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
