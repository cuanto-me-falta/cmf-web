<template>
  <v-container class="my-10">
    <v-row class="text-center">
      <v-col>
        <h1>Bienvenid@ a CuantoMeFalta!</h1>
      </v-col>
    </v-row>
    <v-form v-model="formProps.valid" ref="form" lazy-validation>
      <v-row class="justify-center">
        <v-col cols="6" md="4">
          <v-text-field
            label="Usuario"
            v-model="formData.user"
            :rules="formProps.userRules"
            :counter="8"
            name="username"
            id="username"
            required
          ></v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            label="Clave"
            v-model="formData.passw"
            :rules="formProps.passRules"
            :type="show ? 'text' : 'password'"
            name="password"
            id="password"
            :counter="8"
            required
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center my-5">
        <v-btn @click="submit" :disabled="!formProps.valid" color="primary">
          Ver notas
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: () => ({
    show: false,
    formData: {
      user: '',
      passw: ''
    },
    formProps: {
      valid: true,
      userRules: [
        v => !!v || 'Ingrese su usuario de la UNSA',
        v => (v && v.length == 8) || 'El usuario debe tener 8 caracteres'
      ],

      passRules: [
        v => !!v || 'Ingrese su clave',
        v => (v && v.length == 8) || 'La clave debe tener 8 caracteres'
      ]
    }
  }),

  created: function() {
    if (this.$store.state.credentials.user) {
      this.$router.push('/notas')
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        console.log('submiting', this.formData)
        axios
          .get('http://localhost:1234/query', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: this.formData
          })
          .then(res => {
            if (res.data.error_type) {
              alert(res.data.error_type)
              return
            }
            this.$store.commit('setCredentials', this.formData)

            this.$router.push({
              name: 'Notas',
              params: { user_data: res.data }
            })
          })
          .catch((err, a) => {
            console.log(err, a, this)
          })
      }
    }
  }
}
</script>
