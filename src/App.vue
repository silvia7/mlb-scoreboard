<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: absolute;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  min-width: 100%;


}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;

  width: 80%;
  min-height: 98%;

  border-radius: 5px;
  border: darkgrey 1px solid;

  box-shadow: 2px 5px 4px rgba(0, 0, 0, .25);
}
</style>
