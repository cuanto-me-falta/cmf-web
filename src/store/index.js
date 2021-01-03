import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    credentials: {
      user: '',
      password: ''
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
      state.gradesHandler.currentSumWeights = parseInt(currentSumWeights)
      state.gradesHandler.courseName = courseName
    },

    showMessage(state, content) {
      state.messageHandler.message = content.message
      state.messageHandler.color = content.color
    },

    setCredentials(state, credentials) {
      state.credentials.user = credentials.user
      state.credentials.password = credentials.password
      localStorage.setItem('user', credentials.user)
      localStorage.setItem('password', credentials.password)
    },
    removeCredentials(state) {
      state.credentials.user = ''
      state.credentials.password = ''
      localStorage.removeItem('user')
      localStorage.removeItem('password')
    },
    initialiseCredentials(state) {
      let [user, password] = [
        localStorage.getItem('user'),
        localStorage.getItem('password')
      ]
      if (user && password) {
        state.credentials = { user: user, password: password }
      }
    }
  },
  actions: {},
  modules: {}
})
