<template>
  <div class="wrapper">
    <a class="back" v-on:click="returnToListView()"> ← Back </a>
    <div v-if="data" class="game ">
      <div class="game-info">
        <a v-bind:class="{ selected: data.home.code === selectedTeam }" class="team-label" v-on:click="selectBatters(data.home.batters, data.home.code)">
          <i class="bb-5x team-logo" :class="getLogoClass(data.home.code)"></i>
          {{ data.home.name }}
        </a>
        <span class="vs"> vs.</span>
        <a v-bind:class="{ selected: data.away.code === selectedTeam }" class="team-label" v-on:click="selectBatters(data.away.batters, data.away.code)">
          <i class="bb-5x team-logo" :class="getLogoClass(data.away.code)"></i>
          {{ data.away.name }}
        </a>
        <div class="game-date">{{ data.date.normalDateString }}</div>
      </div>
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

      <batters class="batters" :batters="batters"></batters>
    </div>
    <div class="no-data" v-if="!data || err"> No Game Data Available</div>
  </div>
</template>

<script>
  import {Api} from '../services/mlbApi.js'
  import { utils } from '../mixins/utils'
  import Batters from './BatterStats.vue'

  export default {
    name: "score-board-detail-view",
    mixins: [utils],
    components: {
      Batters
    },
    data() {
      return {
        data: null,
        batters: null,
        err: null,
        selectedTeam: null
      }
    },
    created() {
      let api = new Api();

      api.getGameDetails( this.$route.params.gameDataDir )
        .then( data => {
          console.log(data);
          this.data = data;
          this.batters = data.home.batters;
          this.selectedTeam = data.home.code;
        })
        .catch(err => { this.err = err })

    },
    methods: {
      selectBatters: function( batters, code ) {
        this.selectedTeam = code;
        this.batters = batters;
      },
      returnToListView: function () {
        if ( !this.data ) this.$router.push('/');
        this.$router.push({ name: 'ScoreBoardListView', params: { date: this.data.date.localDateString }});
      }
    }


  }
</script>

<style scoped>
  .back {
    font-weight: bold;
    background-color: #eeeeee;
    border-radius: 5px;

    padding: 5px 10px;
    margin: 5px;

    float: left;

    cursor: pointer;
  }

  .no-data {
    padding-top: 35%;
    display: block;
  }

  .game-info {
    clear: both;
  }

  .team-label{
    margin: 10px;
    padding: 10px;

    font-size: 1.2em;
    display: inline-block;

    text-decoration: none;
    color: black;

    border-radius: 5px;
    cursor: pointer;
  }

  .vs,
  .game-date {
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .team-label:hover {

    background-color: #eeeeee;
  }

  .team-logo {
    display: block;
  }

  .team-code {
    text-transform: uppercase;
  }

  .team-stats {
    border: darkgrey 1px solid;
  }

  .winner,
  .column .label {
    font-weight: bold;
  }

  .column {
    display: inline-block;
    padding: 5px 10px;
  }

  .column:nth-child(even) {
    background-color: #eeeeee;
  }

  .selected {
    border: 2px solid #092668;
  }

  .stats {
    width: auto;
    padding-left: 15px;
  }

  .batters {
    margin-top: 50px;
  }
</style>
