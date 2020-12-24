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
              <v-col cols="11">
                <v-btn outlined @click.stop="addGrade">
                  <h2>+</h2>
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
  data: () => ({}),
  props: ['grades', 'course'],
  components: {
    Course
  },
  created: function() {},
  computed: {
    prom() {
      let prom = 0.0
      for (const grade of this.grades) {
        prom += (grade.porc / 100) * grade.nota
      }
      return prom.toFixed(2)
    }
  },
  methods: {
    addGrade(event) {
      console.log('pressed', event.target.parent, this.grades)
      this.grades.push({
        tipo: 'Nueva Nota',
        porc: 10,
        nota: 10
      })
    }
  }
}
</script>
