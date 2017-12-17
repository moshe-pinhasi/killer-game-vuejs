import Vue from 'vue'
import Vuex from 'vuex'
import GameService from '../services/gameService'
import StorageService from '../services/storageService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: '',
    playersCount: 0,
    players: [],
    gameSaved: false
  },
  mutations: {
    loadGameData(state, gameData) {
      state.currentPage = gameData.currentPage;
      state.playersCount = gameData.playersCount;
      state.players = gameData.players;

      //Object.assign(state, gameData);
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
    setPlayers(state, players) {
      state.players = players;
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
    createPlayers({commit}, playersNames) {
      commit('setPlayers', GameService.createPlayersArray(playersNames));
      commit('saveGameData');
    }
  },
  getters: {
    playersCount: state => state.playersCount,
    players: state => state.players.map(player => Object.assign({}, player)),
    lastPage: state => state.currentPage
  }
})