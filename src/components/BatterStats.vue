<template>
  <div v-if="batters">{{batters}}</div>
</template>

<script>
  export default {
    name: "batter-stats",
    props: {
      batters: {
        type: Array,
        default: () => []
      }
    },
  }
</script>

<style scoped>

</style>
