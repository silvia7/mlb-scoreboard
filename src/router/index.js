import Vue from 'vue'
import Router from 'vue-router'
import ScoreBoardListView from '@/components/ScoreBoardListView'
import ScoreBoardDetailView from '@/components/ScoreBoardDetailView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScoreBoardListView',
      component: ScoreBoardListView
    },
    {
      path:'/game-details/:gameDataDir',
      name: 'ScoreBoardDetailView',
      component: ScoreBoardDetailView
    }
  ]
})
