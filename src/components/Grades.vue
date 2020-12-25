<template>
  <v-container>
    <v-row class="text-center">
      <v-col v-if="this.user_data">
        <h1>Notas</h1>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.user_data">
      <v-expansion-panels
        popout
        v-if="this.user_data.notas.length"
        v-model="activePanel"
        ref="panels"
        class="mb-4"
      >
        <template v-for="(grades, course, index) in this.user_data.notas[0]">
          <CoursePanel :key="index" :grades="grades" :course="course" />
        </template>
      </v-expansion-panels>
    </v-row>
    <div v-else>
      <v-row justify="center" align="end" style="height:200px" class="mb-3">
        <v-col cols="12">
          <div class="text-center" style="height:100%">
            <v-progress-circular :size="100" color="primary" indeterminate>
            </v-progress-circular>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mt-0">
        <v-col cols="12">
          <h2 class="text-center">Cargando Notas...</h2>
        </v-col>
      </v-row>
    </div>
    <!-- <v-row> <v-spacer></v-spacer></v-row> -->
  </v-container>
</template>

<script>
import axios from 'axios'
import CoursePanel from './CoursePanel'

export default {
  name: 'Grades',
  components: {
    CoursePanel
  },
  data: () => ({
    user_data: {},
    activePanel: []
  }),
  created: function() {
    console.log('created', this.credentials, this.user_data)
    this.user_data = this.$route.params.user_data
    if (!this.user_data) this.fetchGrades(this.credentials)
  },
  computed: {
    credentials() {
      return this.$store.state.credentials
    }
  },
  watch: {
    activePanel: function(newVal) {
      if (newVal !== undefined) {
        let children = this.$refs.panels.$children[newVal].$el
        console.log(children)
        setTimeout(() => {
          this.$vuetify.goTo(children, {
            duration: 250,
            offset: 60,
            easing: 'linear'
          })
        }, 100)
      }
    }
  },
  methods: {
    fetchGrades: function(credentials) {
      console.log('FetchGrades: ', credentials)
      axios
        .get('https://cuantomefalta.app/query', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: credentials
        })
        .then(res => {
          if (res.data.error_type) {
            this.$showMessage(
              'El usuario o contraseña son incorrectos',
              'error'
            )
            this.$router.push('/')
            return
          }
          this.user_data = res.data
          this.$store.commit('setCredentials', credentials)
        })
        .catch(error => {
          console.log('Error Grades')
          this.handleError(error)
        })
    }
  }
}
</script>
