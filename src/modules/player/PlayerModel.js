module.exports = function(window){

    var playerTemplate = require('./Player.handlebars');

    function PlayerModel(name) {
        this.name = name;
        this.total = 0;
        this.points = [];

        // maybe change frametotal value or prop
        for(var i = 0; i < 10;i++){
            this.points.push({first: 0, second:0, frameTotal: 0});
        }

    }

    PlayerModel.prototype.play = function () {
        this.points.push(Math.floor(Math.random()) * 11);
        window.app.libraries.mediator.played();
    };

    PlayerModel.prototype.create = function () {
        var activeGame = JSON.parse(localStorage['activeGame']);
        activeGame.players.push(this);
        localStorage['activeGame'] = JSON.stringify(activeGame);
    };


    // this two functions
    PlayerModel.prototype.update = function (playerObjectData) {
        console.log('playerObjectData', playerObjectData);

        this.points[playerObjectData.currentFrameMinusOne][playerObjectData.numberOfThrow] = parseInt(playerObjectData.currentPoint);
        console.log('this.points after update', this.points[playerObjectData.currentFrameMinusOne][playerObjectData.numberOfThrow])
        this.calculateTotal();

        //var activeGame = JSON.parse(localStorage['activeGame']);
        //activeGame.players.push(this);
        //localStorage['activeGame'] = JSON.stringify(activeGame);
    };

    PlayerModel.prototype.calculateTotal = function () {
        var total = 0;
        console.log('in calculateTotal')

        var allowedIntegers = [0,1,2,3,4,5,6,7,8,9];

        for (var i = 0; i < this.points.length; i++){
            console.log(1 in allowedIntegers)
            if (this.points[i].first in allowedIntegers) {
                total += this.points[i].first;
            } else if (this.points[i].second in allowedIntegers){
                total += this.points[i].second;
            }
        }

        console.log('total', total);

    };

    PlayerModel.prototype.getPlayerHTML = function() {
        console.log('player in getPlayerHTML', this)
        var html = playerTemplate(this);
        console.log('html',html);
        return html;

    };

    return PlayerModel;

};