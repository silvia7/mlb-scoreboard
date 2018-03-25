import Vue from 'vue'
import Router from 'vue-router'
import ScoreBoard from '@/components/ScoreBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScoreBoard',
      component: ScoreBoard
    }
  ]
})
