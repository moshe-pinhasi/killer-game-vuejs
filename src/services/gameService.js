'use strict'

const words = ["אוכל", "משי", "קואלה", "פלפל", "קינמון", "דרקון", "שינה", "יפה", "גן", "פארק", "מעצבנים", "שיר", "פזמון", "מפגרים", "דור", "אביב", "סתיו", "קיץ", "יולי", "גיטרה"];

function _getRandomWord() {
    const min = 0;
    const max = words.length-1;
    const rndIndex = Math.floor(Math.random() * (max - min + 1) + min);
    const word = words.splice(rndIndex, 1);
    return word[0];
}

function _guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function _createPlayer(name) {
    return {
        id: _guid(),
        name: name,
        killedWord: _getRandomWord(),
        isAlive: true
    }
}

function createPlayersArray(playersNames) {
    return shuffle(playersNames.map( player => _createPlayer(player.name)));
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default {
    createPlayersArray,
    shuffle
}