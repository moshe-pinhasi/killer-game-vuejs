'use strict'

const words = ["אוכל", "משי", "קואלה", "פלפל", "קינמון", "דרקון", "שינה", "יפה", "גן", "פארק", "מעצבנים", "שיר", "פזמון", "מפגרים", "דור", "אביב", "סתיו", "קיץ", "יולי", "גיטרה"];

function _getRandomWord() {
    const min = 0;
    const max = words.length-1;
    const rndIndex = Math.floor(Math.random() * (max - min + 1) + min);
    const word = words.splice(rndIndex, 1);
    return word[0];
}

function _createPlayersData(players) {
    return players.map( ({id, name}) => {
        return {
            id: id,
            name: name,
            killedWord: _getRandomWord(),
            isAlive: true,
            target: null
        }
    });
}

function _getTargetDetails(target) {
    return {
        id: target.id,
        name: target.name,
        killedWord: target.killedWord,
        isAlive: target.isAlive
    };
}

function createPlayersArray(playersNames) {
    const players =  _createPlayersData(playersNames);

    for (var i = 0; i<players.length; i++) {
        var j = i + 1;
        if (j >= players.length) {
            j = 0;
        }

        players[i].target = _getTargetDetails(players[j]);
    }
    return shuffle(players);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function updateTargets(killers, killerId) {
    // find the player that is out of game
    var killerOut = killers.find(k => k.id === killerId);
    killerOut.isAlive = false;

    var kiilersInGame = killers.filter(killer => killer.isAlive);
    
    // find the player that he was his target
    var killingPlayer = killers.find(k => k.target.id === killerId);

    if (kiilersInGame.length === 1) {
        killingPlayer.target = null;
    } else {
        var newTarget = killers.find(k => k.id === killerOut.target.id);
        killingPlayer.target = _getTargetDetails(newTarget);
    }

    return killers;
}

function isGameFinished(killers) {
    return killers.filter(killer => killer.isAlive).length === 1;
}

export default {
    createPlayersArray,
    shuffle,
    updateTargets,
    isGameFinished
}