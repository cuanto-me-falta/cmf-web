<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Notas</h1>
        {{ JSON.stringify(this.user_data, 4) }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Grades',
  data: () => ({
    user_data: {}
  }),
  created: function() {
    console.log('created', this.credentials)
    this.user_data = this.$route.params.user_data
    if (!this.user_data) this.fetchGrades(this.credentials)
  },
  computed: {
    credentials() {
      return this.$store.state.credentials
    }
  },
  methods: {
    fetchGrades(credentials) {
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
            alert(res.data.error_type)
            return
          }
          this.user_data = res.data
          this.$store.commit('setCredentials', credentials)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
