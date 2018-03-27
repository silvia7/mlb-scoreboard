<template>

  <div class="wrapper">
    <h1 class="app-name"><i class="bb-2x bb-mlb"></i> MLB Scoreboard</h1>


    <button class="btn arrow" v-on:click="moveDate( 1 )"> < </button>
    <datepicker class="date-picker" v-on:input="updateGames" :value="date" format="d MMMM yyyy" name="game-date"></datepicker>
    <button class="btn arrow" v-on:click="moveDate( -1 )"> > </button>

    <div v-if="data">
      <div class="game" v-for="game of games">
        <router-link :to="{name: 'ScoreBoardDetailView', params:{ gameDataDir: game.game_data_directory}}">
          <div v-bind:class="{ winner: game.homescore > game.awayscore }" class="team">
            <i class="bb-5x" :class="getLogoClass(game.home_code)"></i>
            {{ game.home_team_name }}
            <span v-if="game.homescore">{{ game.homescore }}</span>
          </div>

          <div v-bind:class="{ winner: game.homescore < game.awayscore }" class="team">
            <i class="bb-5x" :class="getLogoClass(game.away_code)"></i>
            {{ game.away_team_name }}
            <span v-if="game.awayscore">{{ game.awayscore }}</span>
          </div>

          <div class="game-status" >{{ game.status.status }}</div>
        </router-link>
      </div>
    </div>

    <div v-if="err || !games">No Game on {{ this.date.toDateString() }}</div>

  </div>
</template>

<script>
import { Api } from '../services/mlbApi'
import { utils } from '../mixins/utils'
import Datepicker from 'vuejs-datepicker';

let api = new Api();

export default {
  name: 'ScoreBoardListView',
  mixins: [utils],
  data () {
    return {
      data: null,
      games: null,
      err: null,
      date: null,
    }
  },
  components: {
    Datepicker
  },
  created() {
    let gameDate = null;

    if ( this.$route && this.$route.params.date ) {
      gameDate = this.stringToDate( this.$route.params.date );
    }

    gameDate = gameDate || new Date(2014, 9, 6); // Set default date to Oct 06 2014

    this.updateGames(gameDate);
  },
  methods: {
    updateGames: function(newDate) {
      if ( ( newDate - this.date ) === 0 ) return;

      const dateString = newDate.toLocaleDateString();
      this.$router.push({ name: 'ScoreBoardListView', params: { date: dateString }});

      this.date = newDate;
      this.games = null;
      this.err = null;
      this.data = null;

      api.getScoreBoardData( newDate )
        .then(data => {
          this.data = data;
          this.games = data.game;

        })
        .catch(err => { this.err = err })
    },
    moveDate( day ) {
      const newDate = new Date();
      newDate.setDate(this.date .getDate() + day);

      this.updateGames(newDate);
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

.game{
  padding: 5px;
  border: darkgrey 1px solid;
}

.winner{
  font-weight: bold;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.date-picker,
.btn.arrow {
  display: inline-block;
}
</style>
