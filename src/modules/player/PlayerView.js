module.exports = function () {

    var playerTemplate = require('./Player.handlebars');

    function PlayerView() {
        this.template = playerTemplate;

        this.scoreboard = document.querySelector('[data-game=scoreboard]');

    }

    PlayerView.prototype.bind = function (event, handler){
        if (event === 'getInputData'){

        }
    };

    //PlayerView.prototype.getPlayerHTML = function(player) {
    //
    //    var html = this.template(player);
    //    return html;
    //
    //};

    return PlayerView;
};