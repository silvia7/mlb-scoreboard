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
  getScoreBoardData(link) {
    return this.api.get(link)
      .then(res => res.data.data.games)
      .catch(err => err)
  }

  getGameDetails(gameDataDir) {
    return this.api.get(gameDataDir)
      .then(res => res.data.data)
      .catch(err => err)
  }

}
