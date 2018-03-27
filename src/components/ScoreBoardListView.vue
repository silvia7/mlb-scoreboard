<template>

  <div class="wrapper">
    <h1 class="app-name"><i class="bb-2x bb-mlb"></i> MLB Scoreboard</h1>

    <favourite-team-selector @changed="arrangeGames"></favourite-team-selector>
    <button class="btn arrow" v-on:click="moveDate( -1 )"> < </button>
    <datepicker class="date-picker" v-on:input="updateGames" :value="date" format="d MMMM yyyy" name="game-date"></datepicker>
    <button class="btn arrow" v-on:click="moveDate( 1 )"> > </button>

    <div class="games" v-if="data">
      <div class="game" v-for="game of games">
        <router-link class="game-redirect" :to="{name: 'ScoreBoardDetailView', params:{ gameDataDir: game.game_data_directory}}">
          <div v-bind:class="{ winner: game.homescore > game.awayscore }" class="team">
            <i class="bb-5x team-logo" :class="getLogoClass(game.home_code)"></i>
            <span class="team-name"> {{ game.home_team_name }} </span>
            <span>{{ game.homescore }}</span>
          </div>

          <div v-bind:class="{ winner: game.homescore < game.awayscore }" class="team">
            <i class="bb-5x team-logo" :class="getLogoClass(game.away_code)"></i>
            <span class="team-name"> {{ game.away_team_name }} </span>
            <span>{{ game.awayscore }}</span>
          </div>

          <div class="game-status" >{{ game.status.status }}</div>
        </router-link>
      </div>
    </div>

    <div class="no-data" v-if="!loading && ( err || !games )">No Game on {{ this.date.toDateString() }}</div>

  </div>
</template>

<script>
import { Api } from '../services/mlbApi'
import { utils } from '../mixins/utils'
import Datepicker from 'vuejs-datepicker';
import FavouriteTeamSelector from  './FavouriteTeamSelector'

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
      favouriteTeam: null,
      loading: true,
    }
  },
  components: {
    Datepicker,
    FavouriteTeamSelector
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
    updateGames(newDate) {
      if ( ( newDate - this.date ) === 0 ) return;

      const dateString = newDate.toLocaleDateString();
      this.$router.push({ name: 'ScoreBoardListView', params: { date: dateString }});

      this.date = newDate;
      this.games = null;
      this.err = null;
      this.data = null;
      this.loading = true;

      api.getScoreBoardData( newDate )
        .then(data => {
          this.data = data;
          this.games = data.game;

          this.loading = false;

          this.arrangeGames( this.favouriteTeam );
        })
        .catch(err => {
          this.err = err;
          this.loading = false;
        })
    },
    moveDate( day ) {
      const newDate = new Date();
      newDate.setDate(this.date .getDate() + day);

      this.updateGames(newDate);
    },

    arrangeGames( favouriteTeam ) {
      if ( ! favouriteTeam  ) return;
      this.favouriteTeam = favouriteTeam;

      if( !this.games ) return;

      let favGames = this.games.filter( game =>
        ( game.home_file_code == favouriteTeam || game.away_file_code == favouriteTeam ) );

      favGames.forEach(( game => {
        let idx = this.games.indexOf(game);
        if (idx >= 0) this.games.splice(idx, 1);
      }).bind(this) );

      this.games = favGames.concat( this.games );

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

.no-data {
  padding-top: 20%;
}

.game{
  display: inline-block;

  width: 200px;
  min-height: 250px;

  margin: 10px;
  padding-top: 10px;

  border-radius: 5px;
  border: darkgrey 1px solid;
}

.game-redirect {
  text-decoration: none;
  color: black;
}


.team-name {
  display: block;
}

.game-status {
  background-color: #092668;
  padding: 10px 5px;
  margin-top: 5px;

  font-weight: bold;
  color: white;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.team-logo {
  display: block;
  min-height: 89px;
  min-width: 1px;
}

.winner{
  font-weight: bold;
}

.date-picker,
.btn.arrow {
  display: inline-block;
}
</style>
