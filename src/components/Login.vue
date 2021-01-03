<template>
  <v-container class="my-6">
    <v-row class="text-center">
      <v-col>
        <h1>Bienvenid@ a CuantoMeFalta!</h1>
      </v-col>
    </v-row>
    <v-form
      v-model="formProps.valid"
      ref="form"
      lazy-validation
      v-on:submit.prevent
    >
      <v-row class="justify-center">
        <v-col cols="6" md="4">
          <v-text-field
            label="Usuario"
            v-model="formData.user"
            :rules="formProps.userRules"
            :counter="8"
            name="username"
            id="username"
            autocomplete="username"
            required
            ref="username"
          ></v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            label="Clave"
            v-model="formData.password"
            :rules="formProps.passRules"
            :type="show ? 'text' : 'password'"
            name="password"
            id="password"
            autocomplete="password"
            :counter="8"
            required
            ref="password"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center my-5">
        <v-btn
          :loading="loading"
          @click="submit"
          :disabled="!formProps.valid || loading"
          color="primary"
          large
          type="submit"
        >
          Ver notas
          <template v-slot:loader>
            <span color="info">Iniciando...</span>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: () => ({
    show: false,
    formData: {
      user: '',
      password: ''
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
    },
    loading: false
  }),

  created: function() {
    if (this.isLogged(this.$store.state.credentials)) {
      this.$router.push('/notas')
    }
  },
  mounted: function() {
    // const inRef = this.$refs.username
    // const passRef = this.$refs.password
    this.$refs.username.$data.isFocused = true
    this.$refs.password.$data.isFocused = true
  },

  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        console.log('submiting', this.formData)
        this.loading = true
        axios
          .get('https://partials.cuantomefalta.app/query_unsa', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: this.formData
          })
          .then(res => {
            if (res.data.error_type) {
              this.$showMessage(
                'El usuario o contraseña son incorrectos',
                'error'
              )
              this.loading = false
              return
            }
            this.$store.commit('setCredentials', this.formData)

            this.loading = false
            this.$router.push({
              name: 'Notas',
              params: { user_data: res.data }
            })
          })
          .catch((err, a) => {
            console.log('Error Login:', err, a, this)
            this.handleError(err)
            this.loading = false
          })
      }
    }
  }
}
</script>
