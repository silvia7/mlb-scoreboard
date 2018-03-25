<template>
  <div class="wrapper">
    <h1 class="app-name">{{ appName }}</h1>
    <h2> content TBD </h2>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  data () {
    return {
      appName: 'MLB Scoreboard'
    }
  }
}
</script>


<style scoped>
.app-name {
  font-weight: bold;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
