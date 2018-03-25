<template>
  <div v-if="batters">
    <div class="row label">
      <span class="name">Name</span>
      <span class="stat">AB</span>
      <span class="stat">R</span>
      <span class="stat">H</span>
      <span class="stat">RBI</span>
      <span class="stat">BB</span>
      <span class="stat">SO</span>
      <span class="stat">AVG</span>
    </div>
    <div class="row batter" v-for="batter in batters">
      <span class="name">{{ batter.name_display_first_last }}</span>
      <span class="stat">{{ batter.ab || 0 }}</span>
      <span class="stat">{{ batter.rh || 0 }}</span>
      <span class="stat">{{ batter.r || 0 }}</span>
      <span class="stat">{{ batter.rbi || 0 }}</span>
      <span class="stat">{{ batter.bb || 0 }}</span>
      <span class="stat">{{ batter.so ||0 }}</span>
      <span class="stat">{{ batter.avg || 0}}</span>
    </div>
  </div>
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
  .label {
    font-weight: bold;
  }

  .row .name {
    display: inline-block;
    width: 20%;
  }

  .row .stat {
    display: inline-block;
    width: 10%;
  }
</style>
