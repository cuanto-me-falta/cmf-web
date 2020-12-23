import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    credentials: {
      user: '',
      passw: ''
    }
  },
  mutations: {
    setCredentials(state, credentials) {
      state.credentials.user = credentials.user
      state.credentials.passw = credentials.passw
      localStorage.setItem('user', credentials.user)
      localStorage.setItem('passw', credentials.passw)
    },
    removeCredentials(state) {
      state.credentials.user = ''
      state.credentials.passw = ''
      localStorage.removeItem('user')
      localStorage.removeItem('passw')
    },
    initialiseCredentials(state) {
      let [user, passw] = [
        localStorage.getItem('user'),
        localStorage.getItem('passw')
      ]
      if (user && passw) {
        state.credentials = { user: user, passw: passw }
      }
    }
  },
  actions: {},
  modules: {}
})
