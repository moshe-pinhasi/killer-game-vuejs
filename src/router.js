import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomePageComp from './pages/WelcomePage'
import SetPlayersPageComp from './pages/SetPlayersPage'
import GameReadyPageComp from './pages/GameReadyPage.vue'
import GameOnPageComp from './pages/GameOnPage.vue'
import KillerDetailsPageComp from './pages/KillerDetailsPage.vue'

export const WelcomePage = 'WelcomePage'
export const SetPlayersPage = 'SetPlayersPage'
export const GameReadyPage = 'GameReadyPage'
export const GameOnPage = 'GameOnPage'
export const KillerDetails = 'KillerDetails'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: WelcomePage, component: WelcomePageComp },
  { path: '/setPlayers', name: SetPlayersPage, component: SetPlayersPageComp},
  { path: '/gameReady', name: GameReadyPage, component: GameReadyPageComp},
  { path: '/gameOn', name: GameOnPage, component: GameOnPageComp},
  { path: '/gameOn/killer/:id', name: KillerDetails, component: KillerDetailsPageComp}
]

export default new VueRouter({routes})