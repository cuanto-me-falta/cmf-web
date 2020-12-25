<template>
  <v-snackbar
    v-model="show"
    :color="color"
    timeout="2500"
    transition="slide-y-transition"
    width="250"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        Okey
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'showMessage') {
        this.message = state.messageHandler.message
        this.color = state.messageHandler.color
        this.show = true
      }
    })
  }
}
</script>
