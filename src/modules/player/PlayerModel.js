module.exports = function(window){

    var playerTemplate = require('./Player.handlebars');

    function PlayerModel(name) {
        this.name = name;
        this.total = '';
        this.points = [];

        // maybe change frametotal value or prop
        for(var i = 0; i < 10;i++){
            this.points.push({first: '', second: '', frameTotal: ''});
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
        for (var prop in playerObjectData){
            console.log(prop, ': ', playerObjectData[prop])
        }

        var currentPlayerFrame = this.points[playerObjectData.currentFrameMinusOne];
        var numberOfThrow = playerObjectData.numberOfThrow;
        var currentPoint = playerObjectData.currentPoint;
        console.log('currentPoint',currentPoint)
        console.log('currentPlayerFrame',currentPlayerFrame)
        console.log('playerObjectData.numberOfThrow', playerObjectData.numberOfThrow)
        currentPlayerFrame[numberOfThrow] = parseInt(currentPoint);
        //console.log('this.points after update', currentPlayerFrame.currentPoint);


        this.calculateTotal(currentPlayerFrame, numberOfThrow, currentPoint);
        this.save();

        //var activeGame = JSON.parse(localStorage['activeGame']);
        //activeGame.players.push(this);
        //localStorage['activeGame'] = JSON.stringify(activeGame);
    };

    PlayerModel.prototype.save = function () {
        var activeGame = JSON.parse(localStorage['activeGame']);
        console.log(activeGame.players)
        for (var i = 0; i < activeGame.players.length; i++){
            if (this.name === activeGame.players[i].name){
                console.log('this.name === activeGame.players[i].name')
                activeGame.players.splice(i,1, this);
            }
        }
        console.log(activeGame.players);
        localStorage['activeGame'] = JSON.stringify(activeGame);
    };

    PlayerModel.prototype.calculateTotal = function (currentPlayerFrame, numberOfThrow, currentPoint) {
        this.total *= 1;
        console.log('in calculateTotal')

        var allowedIntegers = [0,1,2,3,4,5,6,7,8,9];
        console.log('currentPlayerFrame', currentPlayerFrame)
        if (numberOfThrow === 'first' && currentPlayerFrame.first in allowedIntegers){
            console.log('this.points[currentPlayerFrame].first', currentPlayerFrame.first)
            this.total += currentPlayerFrame.first;

        }
        if (numberOfThrow === 'second' && currentPlayerFrame.second in allowedIntegers){
            this.total += currentPlayerFrame.second;
        }

        console.log('this.total', this.total);

    };

    PlayerModel.prototype.getPlayerHTML = function() {
        //console.log('player in getPlayerHTML', this)
        var html = playerTemplate(this);
        //console.log('html',html);
        return html;

    };

    return PlayerModel;

};