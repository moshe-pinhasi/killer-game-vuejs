import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomePageComp from './pages/WelcomePage'
import SetPlayersPageComp from './pages/SetPlayersPage'
import GameReadyPageComp from './pages/GameReadyPage.vue'
import GameOnPageComp from './pages/GameOnPage.vue'

export const WelcomePage = 'WelcomePage'
export const SetPlayersPage = 'SetPlayersPage'
export const GameReadyPage = 'GameReadyPage'
export const GameOnPage = 'GameOnPage'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: WelcomePage, component: WelcomePageComp },
  { path: '/setPlayers', name: SetPlayersPage, component: SetPlayersPageComp},
  { path: '/gameReady', name: GameReadyPage, component: GameReadyPageComp},
  { path: '/gameOn', name: GameOnPage, component: GameOnPageComp}
]

export default new VueRouter({mode: 'history', routes})