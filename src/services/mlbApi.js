import axios from 'axios'

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

  //TODO: take as input dd/mm/yy
  getScoreBoardData( link ) {
    return this.api.get( link )
      .then( res => res.data.data.games )
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
        return game;
      })
      .catch( err => {
        return Promise.reject( err.response );
      });
  }

}
