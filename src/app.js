(function(window) {
    'use strict';

    window.app = {};
    window.app.libraries = {};

    var PlayerController = require('./modules/player/PlayerController.js')(window);
    var ScoreboardController = require('./modules/scoreboard/ScoreboardController.js')();
    var scoreboard = new ScoreboardController();

    var Mediator = require('./modules/mediator/MediatorController.js')(PlayerController, scoreboard, window);
    window.app.libraries.mediator = new Mediator();
    window.app.libraries.mediator.init();
})(window);
