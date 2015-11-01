module.exports = function(window){

    var playerTemplate = require('./Player.handlebars');

    function PlayerModel(name) {
        this.name = name;
        this.total = 0;
        this.points = [];

        for(var i = 0; i < 10;i++){
            this.points.push({first: 0, second:0});
        }

    }

    PlayerModel.prototype.play = function () {
        this.points.push(Math.floor(Math.random()) * 11);
        window.app.libraries.mediator.played();
    };

    PlayerModel.prototype.save = function () {
        //console.log('window in save func', window);
        //console.log('localStorage', localStorage);
        var activeGame = JSON.parse(localStorage['activeGame']);
        var player = {};
        player.name = this.name;
        player.points = this.points;
        activeGame.players.push(player);
        //console.log('player', player);
        //console.log('activeGame', activeGame);
        localStorage['activeGame'] = JSON.stringify(activeGame);
    };

    PlayerModel.prototype.getPlayerHTML = function() {
        console.log('player in getPlayerHTML', this)
        var html = playerTemplate(this);
        console.log('html',html)
        return html;

    };

    return PlayerModel;

};