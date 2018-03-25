<template>
  <div class="team-stats">

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

      console.log(this.$route.params.gameDataDir);

      api.getGameDetails(this.$route.params.gameDataDir)
        .then(data => {
          this.data = data;
        })
        .catch(err => { this.err = err })

    }

  }
</script>

<style scoped>
  .team-code {
    text-transform: uppercase;
  }

  .winner {
    font-weight: bold;
  }

  .column {
    display: inline-block;
    padding: 5px;
  }
</style>
