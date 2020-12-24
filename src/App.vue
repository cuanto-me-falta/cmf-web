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
      <v-btn text @click="changeTheme">
        Modo {{ this.darkMode ? 'claro' : 'oscuro' }}</v-btn
      >
      <v-btn v-if="this.logged" text @click="logout"> Cerrar sesión</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <SnackBar />
      <AddGrade />
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from './components/SnackBar'
import AddGrade from './components/AddGrade'

export default {
  name: 'App',

  components: {
    SnackBar,
    AddGrade
  },

  data: () => ({
    //
    darkMode: false
  }),

  computed: {
    logged: function() {
      if (this.$store.state.credentials.user) {
        return true
      }
      return false
    }
  },
  created: function() {
    // let dark = localStorage.getItem('darkMode')
    // if (dark !== null) {
    //   this.darkMode = dark
    //   console.log('Variable in  local', dark)
    //   this.$vuetify.theme.dark = dark
    // } else {
    //   console.log('Variable not in local. Setting...')
    //   localStorage.setItem('darkMode', false)
    // }
    this.$vuetify.theme.dark = true
    this.darkMode = localStorage.getItem('darkMode') == 'true'
    if (this.darkMode === null) {
      console.log('Not in local')
      localStorage.setItem('darkMode', false)
    }
    if (this.darkMode === true) {
      console.log(
        'darkmode is true before created',
        !!localStorage.getItem('darkMode')
      )
      this.$vuetify.theme.dark = true
    } else {
      console.log('darkmode is false before created')
      this.$vuetify.theme.dark = false
    }
    console.log('Variable in  vuetify', this.$vuetify.theme.dark, this.darkMode)
  },

  methods: {
    logout: function() {
      this.$store.commit('removeCredentials')
      this.$router.push('/')
    },
    changeTheme: function() {
      this.darkMode = !this.darkMode
      this.$vuetify.theme.dark = this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
      console.log('Changing to', this.darkMode, this.$vuetify.theme.dark)
    }
  }
}
</script>
