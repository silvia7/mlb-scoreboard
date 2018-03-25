<template>
  <div class="wrapper">
    <h1 class="app-name">MLB Scoreboard</h1>

    <div v-if="data">
      <div class="game" v-for="game of games">
        <router-link :to="{name: 'ScoreBoardDetailView', params:{ gameDataDir: game.game_data_directory}}">
          <div v-bind:class="{ winner: game.homescore > game.awayscore }" class="team">
            {{ game.home_team_name }}
            <span v-if="game.homescore">{{ game.homescore }}</span>
          </div>

          <div v-bind:class="{ winner: game.homescore < game.awayscore }" class="team">
            {{ game.away_team_name }}
            <span v-if="game.awayscore">{{ game.awayscore }}</span>
          </div>

          <div class="game-status" >{{ game.status.status }}</div>
        </router-link>
      </div>
    </div>

    <div v-if="err">No Game Today</div>

  </div>
</template>

<script>
import {Api} from '../services/mlbApi.js'

export default {
  name: 'ScoreBoardListView',
  data () {
    return {
      data: null,
      games: null,
      err: null
    }
  },

  created() {
    let api = new Api();

    api.getScoreBoardData('components/game/mlb/year_2014/month_04/day_06/master_scoreboard.json')
      .then(data => {
        this.data = data;
        this.games = ( Array.isArray(data.game) ) ? data.game:[data.game];
        console.log(data);
        this.games.forEach(game => {
          if ( game.linescore && game.linescore.r ) {
            game.homescore = Number(game.linescore.r.home);
            game.awayscore = Number(game.linescore.r.away);
          }
        });
      })
      .catch(err => { this.err = err })

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

.game{
  padding: 5px;
  border: darkgrey 1px solid;
}

.winner{
  font-weight: bold;
}
</style>
