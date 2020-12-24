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
        <tr v-for="(item, index) in grades" :key="index">
          <td>{{ item.tipo }}</td>
          <td>{{ item.nota }}</td>
          <td>{{ item.porc }}%</td>
          <!-- <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td> -->
        </tr>
        <tr>
          <td><b>Promedio</b></td>
          <td></td>
          <td>
            <b>
              {{ promCourse }}
            </b>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'Course',
  props: ['grades'],
  created: function() {},
  computed: {
    promCourse() {
      let prom = 0.0
      for (const grade of this.grades) {
        prom += (grade.porc / 100) * grade.nota
      }
      return prom.toFixed(2)
    }
  }
}
</script>
