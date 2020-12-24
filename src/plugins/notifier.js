import store from '../store'

export default {
  install(Vue) {
    Vue.prototype.$showMessage = (message, color = 'info') => {
      store.commit('showMessage', { message: message, color: color })
    }
  }
}
