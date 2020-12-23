<template>
  <v-app>
    <v-app-bar app color="primary" class="px-16" dark>
      <div class="d-flex align-center">
        <v-toolbar-title><h1>CMF</h1></v-toolbar-title>
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>
      <v-btn v-if="this.logged" text @click="logout"> Cerrar sesión</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import Home from "./components/Home";

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),

  computed: {
    logged() {
      if (this.$store.state.credentials.user) {
        return true
      }
      return false
    }
  },

  methods: {
    logout() {
      this.$store.commit('removeCredentials')
      this.$router.push('/')
    }
  }
}
</script>
