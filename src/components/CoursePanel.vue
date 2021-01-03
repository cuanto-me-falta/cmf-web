<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row no-gutters class="align-center">
        <v-col cols="4">
          <h4>{{ course }}</h4>
        </v-col>
        <v-col cols="8">
          <v-fade-transition leave-absolute>
            <v-row
              v-if="open"
              justify="end"
              no-gutters
              style="width: 100%"
              class="justify-center text-center align-center"
            >
              <!-- <v-col cols="5" lg="6"></v-col> -->
              <v-col
                cols="2"
                lg="1"
                class="ml-auto"
                offset="0"
                offset-md="5"
                offset-lg="6"
              >
                <v-btn
                  outlined
                  color="primary"
                  small
                  @click.stop="addGrades"
                  class="mr-4"
                >
                  <v-icon center>mdi-plus-thick </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1"></v-col>
              <v-col cols="3" lg="2">
                <v-btn
                  outlined
                  color="error"
                  small
                  @click.stop="removeCustomGrades"
                  class="ml-2"
                >
                  <v-icon center>mdi-reload </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1" lg="2">
                <template v-slot:actions>
                  <v-icon color="primary">
                    $expand
                  </v-icon>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-else
              no-gutters
              class="justify-end text-right"
              style="width: 100%"
            >
              <v-col cols="6" offset="1" offset-md="1">
                <h4>
                  <span class="d-none d-sm-inline">Promedio</span>
                  <span class="d-sm-none"> Prom </span>:
                  {{ prom }}
                </h4>
              </v-col>
              <v-col cols="1" lg="2">
                <template v-slot:actions>
                  <v-icon color="primary">
                    $expand
                  </v-icon>
                </template>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <Course :grades="grades" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import Course from './Course'

export default {
  name: 'CoursePanel',
  props: ['grades', 'course'],
  data: () => ({ panelElements: [] }),
  components: {
    Course
  },
  computed: {
    prom() {
      let prom = 0.0
      for (const grade of this.grades) {
        prom += grade.weight * grade.score
      }
      return prom.toFixed(2)
    },
    course_grades() {
      return this.grades
    },
    currentSumWeights() {
      let result = this.grades.reduce((total_weight, current_weight) => {
        return total_weight + parseFloat(current_weight.weight)
      }, 0)
      console.log('Pesos:', result)
      return result * 100
    }
  },
  methods: {
    hola: function(e) {
      console.log(e.target)
    },
    addGrades: function() {
      if (this.currentSumWeights === 100) {
        if (this.prom < 10.5) {
          this.$showMessage('Jalaste we 😐', 'info-lighten2')
        } else {
          this.$showMessage('Aprobaste we 🙂', 'success')
        }
        return
      }
      this.$addGrade([this.course_grades, this.currentSumWeights, this.course])
    },
    removeCustomGrades: function() {
      for (let index = this.course_grades.length - 1; index >= 0; --index) {
        if (this.course_grades[index].name === 'Nueva Nota') {
          this.course_grades.splice(index, 1)
        }
      }
    }
  }
}
</script>
