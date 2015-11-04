(function(window) {
    'use strict';

    window.app = {};
    window.app.libraries = {};

    var events = require('./library/events/events.js');

    var PlayerController = require('./modules/player/PlayerController.js')(window);
    var ScoreboardController = require('./modules/scoreboard/ScoreboardController.js')(events);
    var scoreboard = new ScoreboardController();

    var Mediator = require('./modules/mediator/MediatorController.js')(PlayerController, scoreboard, window, events);
    window.app.libraries.mediator = new Mediator();
    window.app.libraries.mediator.init();
})(window);
