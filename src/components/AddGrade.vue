<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      open-delay="5000"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn
            icon
            dark
            @click="
              dialog = false
              save = false
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ courseName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="
                dialog = false
                save = true
              "
            >
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row class="pl-3 mt-4">
            <h2>Crear Nota</h2>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <Course :grades="grades" :new_grade="new_grade" />
            </v-col>
            <v-col cols="1" class="d-flex">
              <v-layout justify-center align-center>
                Nota
              </v-layout>
            </v-col>
            <v-col cols="2" class="text-center">
              <v-slider
                v-model="new_grade.nota"
                vertical
                style="height: 100%"
                :thumb-size="40"
                min="0"
                max="20"
                thumb-label="always"
                ticks="always"
                tick-size="4"
                color="accent"
              >
                <template v-slot:prepend>
                  0
                </template>
                <template v-slot:append>
                  20
                </template>
              </v-slider>
            </v-col>
            <v-col cols="1" class="d-flex">
              <v-layout justify-center align-center>
                Peso
              </v-layout>
            </v-col>
            <v-col cols="2">
              <v-slider
                v-model="new_grade.porc"
                vertical
                style="height: 100%"
                :thumb-size="40"
                min="1"
                :max="100 - currentSumWeights"
                thumb-label="always"
                ticks="always"
                tick-size="4"
                color="accent"
              >
                <template v-slot:prepend>
                  1%
                </template>
                <template v-slot:append>
                  {{ 100 - currentSumWeights }}%
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="css">
.v-input__slot,
.v-slider {
  height: 95%;
}

.v-input__append-outer,
.v-input__append-outer {
  margin: auto;
}
</style>

<script>
import Course from './Course'

export default {
  name: 'AddGrade',
  components: {
    Course
  },
  data: () => ({
    dialog: false,
    currentSumWeights: 0,
    grades: [],
    new_grade: {
      tipo: 'Nueva Nota',
      porc: 10,
      nota: 10,
      highlight: true
    },
    courseName: '',
    save: true
  }),
  created: function() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'addGrade') {
        this.grades = state.gradesHandler.grades
        this.currentSumWeights = state.gradesHandler.currentSumWeights
        this.courseName = state.gradesHandler.courseName
        this.dialog = true
      }
    })
  },
  watch: {
    dialog: function(newValue) {
      // Modal is opening
      if (newValue === true) {
        this.new_grade.porc = (100 - this.currentSumWeights) / 2
        this.nota = 10
      }
      // Modal is closing and is saving the new grade
      if (newValue === false && this.save) {
        console.log('Save: ', this.save)
        this.grades.push(this.new_grade)
        this.new_grade = {
          tipo: 'Nueva Nota',
          porc: 10,
          nota: 10,
          highlight: true
        }
        // this.$showMessage('Se ha creado su nota', 'success')
      }
    }
  }
}
</script>
