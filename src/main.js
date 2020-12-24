import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import notifier from './plugins/notifier'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    isLogged: function(credentials) {
      if (credentials.user) {
        return true
      }
      return false
    },
    handleError: function(error) {
      if (error.response) {
        // Request made and server responded
        console.log('server responded but errors ocurred')
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        console.log('El servicio no está disponible por el momento')
        // this.$store.commit(
        //   'enableError',
        //   'El servicio no está disponible por el momento'
        // )
        this.$showMessage(
          'El servicio no está disponible por el momento',
          'error'
        )
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
    }
  }
})

// Vue.config.errorHandler = function(error, vm, info) {
//   console.log('Global error:', error, vm, info)
// }

Vue.use(notifier)

Vue.filter('TitleCase', value => {
  return value.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase())
})

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseCredentials')
    // let darkMode = localStorage.getItem('darkMode')
    // if (darkMode !== null) {
    //   console.log('Variable in  local', darkMode)
    //   this.$vuetify.theme.dark = darkMode
    //   console.log('Variable in  vuetify', this.$vuetify.theme.dark)
    // } else {
    //   localStorage.setItem('darkMode', false)
    // }
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
