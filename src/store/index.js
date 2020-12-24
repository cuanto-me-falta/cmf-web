import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    credentials: {
      user: '',
      passw: ''
    },
    messageHandler: {
      message: '',
      color: 'info'
    },
    gradesHandler: {
      grades: [],
      currentSumWeights: 0,
      courseName: ''
    }
  },
  mutations: {
    addGrade(state, content) {
      let [courseGrades, currentSumWeights, courseName] = content
      console.log('Mutation add Grade', courseGrades, currentSumWeights)
      state.gradesHandler.grades = courseGrades
      state.gradesHandler.currentSumWeights = currentSumWeights
      state.gradesHandler.courseName = courseName
    },

    showMessage(state, content) {
      state.messageHandler.message = content.message
      state.messageHandler.color = content.color
    },

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
