import Vue from 'vue'
import Router from 'vue-router'
import ScoreBoardListView from '@/components/ScoreBoardListView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScoreBoardListView',
      component: ScoreBoardListView
    }
  ]
})
