import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#ff5722',
        accent: '#2196f3',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#607d8b',
        success: '#4caf50'
      }
    }
  }
})
