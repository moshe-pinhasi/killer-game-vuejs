'use strict'

const words = [
    "שקשוקה",
    "חבית",
    "אוזניות",
    "גלגל",
    "אהבה",
    "כיסא",
    "משקפיים",
    "אודם",
    "לק",
    "שמיכה",
    "גמל",
    "עניבה",
    "קפה",
    "הליקופטר",
    "פלסטלינה",
    "ספר",
    "קקי",
    "גרב",
    "תינוק",
    "כפית",
    "בוקסה",
    "פנקייק",
    "פאזל",
    "מלוואח",
    "צ'יפס",
    "שטיח",
    "מזלג",
    "פלאפון",
    "מפתח שוודי",
    "מקל",
    "סופגניה",
    "מדים",
    "אש",
    "גלידה",
    "כרית",
    "אור",
    "הר געש",
    "שבוע",
    "דוב",
    "גשר",
    "זר",
    "מנורה",
    "תפוח אדמה",
    "מגנט",
    "מחבט",
    "מחברת",
    "קלסר",
    "תנור",
    "וניל",
    "קרואסון",
    "עוגיות",
    "נעל",
    "מעיל",
    "מסגרת",
    "מלחיה",
    "פעוטון",
    "רמקולים",
    "שמן",
    "דיסק און קי",
    "שפתון",
    "קרם גוף",
    "אגרטל",
    "מטען",
    "טלוויזיה",
    "ספה",
    "ארון",
    "תיק",
    "תעודה",
    "מילון",
    "מדליה",
    "ציור",
    "צבעים",
    "וילון",
    "קורנפלקס",
    "קערה",
    "מטאטא",
    "מכונת כביסה",
    "מקרר",
    "אוכל",
    "משי",
    "קואלה",
    "פלפל",
    "קינמון",
    "דרקון",
    "שינה",
    "יפה",
    "גן",
    "פארק",
    "מעצבנים",
    "שיר",
    "פזמון",
    "מפגרים",
    "אביב",
    "סתיו",
    "קיץ",
    "יולי",
    "גיטרה",
    "עציץ",
    "מיטה",
    "דג",
    "חצאית",
    "כלב",
    "מכונית",
    "נר",
    "אבטיח",
    "חופשה",
    "עבודה",
    "יום הולדת",
    "גרמניה",
    "צרפת",
    "תה",
    "יקר",
    "עגבניה",
    "גזר",
    "מלפפון",
    "עורב",
    "סוס",
    "תרנגולת",
    "פרה",
    "חלב",
    "ניסים",
    "רכב",
    "אופנוע",
    "טלפון"
]

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