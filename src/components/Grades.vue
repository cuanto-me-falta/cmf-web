<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Notas</h1>
        <!-- {{ user_data.notas }} -->
      </v-col>
    </v-row>
    <v-row justify="center" v-if="this.user_data">
      <v-expansion-panels popout v-if="this.user_data.notas.length">
        <template v-for="(grades, course, index) in this.user_data.notas[0]">
          <CoursePanel :key="index" :grades="grades" :course="course" />
        </template>
      </v-expansion-panels>
    </v-row>
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
    user_data: {}
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
  methods: {
    fetchGrades: function(credentials) {
      console.log('FetchGrades: ', credentials)
      axios
        .get('http://localhost:1234/query', {
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
