(function(window) {
    'use strict';

    window.app = {};
    window.app.libraries = {};

    var events = require('./library/events/events.js');

    var PlayerController = require('./modules/player/PlayerController.js')(window);
    var ScoreboardController = require('./modules/scoreboard/ScoreboardController.js')(events);

    var MediatorController = require('./modules/mediator/MediatorController.js')(PlayerController, ScoreboardController, window, events);
    window.app.libraries.mediator = new MediatorController();
    window.app.libraries.mediator.init();

    var ScoreboardList = require('./modules/scoreboardList/ScoreboardListController.js')(MediatorController);
    var scoreboardList = new ScoreboardList();
    scoreboardList.init();
})(window);
