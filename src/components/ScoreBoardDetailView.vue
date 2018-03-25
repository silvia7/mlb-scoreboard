<template>
  <div v-if="data" class="game wrapper">
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
  </div>


</template>

<script>
  import {Api} from '../services/mlbApi.js'

  export default {
    name: "score-board-detail-view",
    data () {
      return {
        data: null,
        err: null
      }
    },
    created() {
      let api = new Api();

      api.getGameDetails(this.$route.params.gameDataDir)
        .then(data => {
          this.data = data;
          console.log(data)
        })
        .catch(err => { this.err = err })

    }

  }
</script>

<style scoped>
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
