<template>
  <div v-if="teams" class="favourite-team-selector">
    Choose your Favourite Team!
    <select v-on:change="favouriteTeamUpdate()" v-model="favouriteTeam">
      <option v-for="team in teams" :value="team.file_code">{{ team.name }}</option>
    </select>
  </div>
</template>

<script>
  //TODO: store favourite team to database
  //TODO: make favourite team user specific

  import { Api } from '../services/mlbApi'
  let api = new Api();

  export default {
    name: "favourite-team-selector",
    data () {
      return {
        favouriteTeam: 'tor', // Default favourite is Toronto Blue Jays
        teams: null,
      }
    },

    created() {
      api.getTeamList()
        .then( data => {
          this.teams = data;
        });
      this.$emit('changed', this.favouriteTeam);
    },

    methods: {
      favouriteTeamUpdate: function () {
        this.$emit('changed', this.favouriteTeam)
      }
    }
  }
</script>

<style scoped>
.favourite-team-selector {
  display: block;
  padding: 10px;
  margin: 10px 0;

  color: white;
  background-color: #092668;
  border-radius: 5px;
}
</style>
