import axios from 'axios'
import { utils } from "../mixins/utils";


export class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://gd2.mlb.com/',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getScoreBoardData( date ) {
    const mm = utils.methods.toTwoDigits( date.getMonth() + 1 );
    const dd = utils.methods.toTwoDigits( date.getDate() );
    const yyyy = date.getFullYear();

    const target = 'components/game/mlb/year_' + yyyy +
      '/month_' + mm + '/day_' + dd + '/master_scoreboard.json';

    return this.api.get( target )
      .then( res => {
        const data = res.data.data.games;
        if ( data.game ) data.game = ( Array.isArray(data.game) ) ? data.game : [data.game];

        data.game.forEach(game => {
          if ( game.linescore && game.linescore.r ) {
            game.homescore = Number(game.linescore.r.home);
            game.awayscore = Number(game.linescore.r.away);
          }
        });

        return data;
      } )
      .catch( err => {
        return Promise.reject( err.response );
      });
  }

  getGameDetails( gameDataDir ) {
    const target = gameDataDir + '/boxscore.json';
    return this.api.get( target )
      .then( res => {
        const boxscore = res.data.data && res.data.data.boxscore;
        if ( !boxscore ) return null;

        const linescore = boxscore.linescore;

        let game = {};
        game.scores = linescore.inning_line_score;
        game.battleStats = [
          {
            'label': 'R',
            'home': linescore.home_team_runs,
            'away': linescore.away_team_runs,
          },
          {
            'label': 'H',
            'home': linescore.home_team_hits,
            'away': linescore.away_team_hits,
          },
          {
            'label': 'E',
            'home': linescore.home_team_errors,
            'away': linescore.away_team_errors,
          },
        ];

        game.home = {
          winner: Number( linescore.home_team_runs ) > Number( linescore.away_team_runs ),
          code: boxscore.home_team_code,
          name: boxscore.home_fname,
          totalWins: boxscore.home_wins,
          totalLosses: boxscore.home_loss,
          batters: boxscore.batting.filter( team => team.team_flag === "home" )[0].batter
        };
        game.away = {
          winner: Number( linescore.home_team_runs ) < Number( linescore.away_team_runs ),
          code: boxscore.away_team_code,
          name: boxscore.away_fname,
          totalWins: boxscore.away_wins,
          totalLosses: boxscore.away_loss,
          batters: boxscore.batting.filter( team => team.team_flag === "away" )[0].batter
        };

        const date = new Date(boxscore.date);
        game.date = {
          localDateString: date.toLocaleDateString(),
          normalDateString: boxscore.date
        };

        return game;
      })
      .catch( err => {
        return Promise.reject( err.response );
      });
  }

  getTeamList() {
    return this.api({
      url: 'json/named.team_all.bam?sport_code=%27mlb%27&active_sw=%27Y%27&all_star_sw=%27N%27',
      baseURL: 'http://lookup-service-prod.mlb.com' })
      .then( res => res.data.team_all.queryResults.row )
      .catch( err => {
        return Promise.reject( err.response );
      });
  }


}
