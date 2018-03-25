<template>
  <div v-if="data" class="game wrapper">
    <button class="team-label" v-on:click="selectBatters(data.home.batters)"> {{ data.home.name }} </button>
    vs.
    <button class="team-label" v-on:click="selectBatters(data.away.batters)"> {{ data.away.name }} </button>

    <div class="team-stats">
      <div class="column">
        <div class="team-code">{{ data.home.code }}</div>
        <div class="team-code">{{ data.away.code }}</div>
      </div>
      <div class="column battle" v-for="battle in data.scores">
        <div class="label">{{ battle.inning }}</div>
        <div>{{ battle.home }}</div>
        <div>{{ battle.away }}</div>
      </div>
      <div class="column stats" v-for="stat in data.battleStats">
        <div class="label">{{ stat.label }}</div>
        <div>{{ stat.home }}</div>
        <div>{{ stat.away }}</div>
      </div>
    </div>

    <batters :batters="batters"></batters>
  </div>

</template>

<script>
  import {Api} from '../services/mlbApi.js'
  import Batters from './BatterStats.vue'

  export default {
    name: "score-board-detail-view",
    components: {
      Batters
    },
    data() {
      return {
        data: null,
        batters: null,
        err: null
      }
    },
    created() {
      let api = new Api();

      api.getGameDetails( this.$route.params.gameDataDir )
        .then( data => {
          this.data = data;
          this.batters = data.home.batters;
          console.log(data)
        })
        .catch(err => { this.err = err })

    },
    methods: {
      selectBatters: function( batters ) {
        this.batters = batters;
      }
    }


  }
</script>

<style scoped>
  .team-label{
    font-size: 1.5em;
    display: inline-block;
  }

  .team-code {
    text-transform: uppercase;
  }

  .winner,
  .column .label {
    font-weight: bold;
  }

  .column {
    display: inline-block;
    padding: 5px;
  }

  .stats {
    padding-left: 15px;
  }
</style>
