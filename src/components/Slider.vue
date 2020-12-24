<template>
  <v-slider
    v-model="value"
    vertical
    style="height: 100%"
    :thumb-size="40"
    thumb-label="always"
  >
    <template v-slot:prepend>
      {{ min }}
    </template>
    <template v-slot:append>
      {{ max }}
    </template>
  </v-slider>
</template>

<style lang="css">
.v-input__slot,
.v-slider {
  height: 95%;
}
</style>

<script>
export default {
  name: 'Slider',
  props: ['value', 'min', 'max']
}
</script>
