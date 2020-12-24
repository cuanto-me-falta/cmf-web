<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Curso
          </th>
          <th class="text-left">
            Nota
          </th>
          <th class="text-left">
            Peso
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in grades"
          :key="index"
          :class="[item.highlight ? 'created' : 'clean']"
        >
          <td>{{ item.tipo | TitleCase }}</td>
          <td>{{ item.nota }}</td>
          <td>{{ item.porc }}%</td>
          <!-- <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td> -->
        </tr>
        <tr v-if="new_grade" class="selectedRow white--text">
          <td>{{ new_grade.tipo | TitleCase }}</td>
          <td>{{ new_grade.nota }}</td>
          <td>{{ new_grade.porc }}%</td>
        </tr>
        <tr>
          <td :style="[new_grade ? { 'font-size': '1em' } : '']">
            <b>Promedio</b>
          </td>
          <td></td>
          <td :style="[new_grade ? { 'font-size': '1.5em' } : '']">
            <b>
              {{ promCourse }}
            </b>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style scoped>
.clean {
  background-color: transparent;
  transition: 2s;
}

.created {
  background-color: var(--v-info-lighten2);
}

.selectedRow {
  background-color: var(--v-info-base);
  transition: 1s;
}
.selectedRow:hover {
  background-color: var(--v-info-base) !important;
}
</style>

<script>
export default {
  name: 'Course',
  props: ['grades', 'new_grade'],
  computed: {
    promCourse() {
      let prom = 0.0
      for (const grade of this.grades) {
        prom += (grade.porc / 100) * grade.nota
      }
      if (this.new_grade) {
        prom += (this.new_grade.porc / 100) * this.new_grade.nota
      }
      return prom.toFixed(2)
    }
  },
  watch: {
    grades: function() {
      let last_grade = this.grades[this.grades.length - 1]
      console.log('Change Grades:', last_grade)
      if (last_grade.highlight) {
        setInterval(
          function() {
            this.grades[this.grades.length - 1].highlight = false
          }.bind(this),
          250
        )
      }
    }
  }
}
</script>
