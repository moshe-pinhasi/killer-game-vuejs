'use strict'

const GAME_STATE = 'GAME_STATE';

function _get() {
    return JSON.parse(localStorage.getItem(GAME_STATE));
}

function save(gameState) {
    localStorage.setItem(GAME_STATE, JSON.stringify(gameState));
}

function load() {
    return _get();
}

function isExist() {
    return !!load();
}

function clear() {
    return localStorage.removeItem(GAME_STATE);
}

export default {
    save,
    load,
    isExist,
    clear
}