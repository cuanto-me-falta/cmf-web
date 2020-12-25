<template>
  <v-app>
    <v-app-bar app color="primary" class="px-md-16 px-xs-4" dark fixed>
      <v-app-bar-nav-icon @click="showSidebar = true" class="d-flex d-sm-none">
      </v-app-bar-nav-icon>
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
      <div class="d-none d-sm-flex">
        <v-btn text @click="changeTheme">
          Modo {{ this.darkMode ? 'claro' : 'oscuro' }}</v-btn
        >
        <v-btn v-if="this.logged" text @click="logout"> Cerrar sesión</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="showSidebar" temporary fixed>
      <v-list nav>
        <v-list-item>
          <v-list-item-content class="my-2">
            <h1>CuantoMeFalta</h1>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group ripple="true" class="mt-5">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-list-item-title text @click="changeTheme"
              >Modo {{ this.darkMode ? 'claro' : 'oscuro' }}</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="this.logged">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title text @click="logout"
              >Cerrar Sesión</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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
    darkMode: false,
    showSidebar: null
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
