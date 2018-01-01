import Vue from 'vue'
import Vuex from 'vuex'
import GameService from '../services/gameService'
import StorageService from '../services/storageService'
import cloneDeep from 'clone-deep'

Vue.use(Vuex)

function _getNewStore() {
  return {
    currentPage: '',
    playersCount: 0,
    players: [],
    killers: [],
    killersToDisplay: [],
    gameFinished: false,
    gameSaved: false
  };
}

export default new Vuex.Store({
  state: _getNewStore(),
  mutations: {
    setNewGame(state) {
      state = Object.assign(state, _getNewStore());
    },
    loadGameData(state, gameData) {
      state = Object.assign(state, gameData);
    },
    saveGameData(state) {
      state.gameSaved = true;
      StorageService.save(Object.assign({}, state));
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
      state.gameSaved = false;
    },
    setPlayersCount(state, playersCount) {
      state.playersCount = playersCount;
      state.gameSaved = false;
    },
    setPlayers(state, paylaod) {
      state.killers = paylaod.killers;
      state.players = paylaod.playersNames;
      state.killersToDisplay = paylaod.killersToDisplay;
      state.gameSaved = false;
    },
    setKillers(state, paylaod) {
      state.killers = GameService.updateTargets(state.killers, paylaod.killerOutOfGameId);
      state.killersToDisplay = GameService.updateTargets(state.killersToDisplay, paylaod.killerOutOfGameId);
      state.gameFinished = GameService.isGameFinished(state.killersToDisplay);
      state.gameSaved = false;
    }
  },
  actions: {
    loadGameData({commit}) {
      return new Promise((resolve, reject) => {
        const gameData = StorageService.load();
        commit('loadGameData', gameData);
        resolve();
      });
      
    },
    saveGameData({commit}) {
      commit('saveGameData');
    },
    setPageView({commit}, page) {
      commit('setCurrentPage', page);
      commit('saveGameData');
    },
    setNumOfPlayers({commit}, numOfPlayers) {
      commit('setPlayersCount', numOfPlayers);
      commit('saveGameData');
    },
    killerKillHisTarget({commit}, killerId) {
      commit('setPlayersCount', numOfPlayers);
      commit('saveGameData');
    },
    createPlayers({commit}, playersNames) {
      const killers = GameService.createPlayersArray(playersNames);
      const killersToDisplay = GameService.shuffle(cloneDeep(killers));
      
      commit('setPlayers', {playersNames, killers, killersToDisplay});
      commit('saveGameData');
    },
    killerIsOutOfGame({commit}, killerOutOfGameId) {
      commit('setKillers', { killerOutOfGameId });
      commit('saveGameData');
    },
    resetGame({commit}) {
      StorageService.clear();
      commit('setNewGame');
    }
  },
  getters: {
    playersCount: state => state.playersCount,
    players: state => state.players.map(player => Object.assign({}, player)),
    killersToDisplay: state => state.killersToDisplay,
    killer: state => (killerId) => {
      var res = state.killers.filter(k => k.id === killerId);
      if (res && res.length > 0) {
        return res[0];
      }

      return null;
    },
    gameFinished: state => state.gameFinished,
    lastPage: state => state.currentPage
  }
})