import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GuessMyHiragana from '../views/GuessMyHiragana.vue'
import GuessMyNumber from '../views/GuessMyNumber.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/guessMyNumber',
    name: 'GuessMyNumber',
    component: GuessMyNumber
  },
  {
    path: '/guessMyHiragana',
    name: 'GuessMyHiragana',
    component: GuessMyHiragana
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router