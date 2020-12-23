<template>
  <div class="notas">
    <Grades />
  </div>
</template>

<script>
// @ is an alias to /src
import Grades from '@/components/Grades.vue'

export default {
  name: 'Notas',
  components: {
    Grades
  }
}
</script>
