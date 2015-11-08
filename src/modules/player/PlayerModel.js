module.exports = function(window){

    // this should be in the view
    var playerTemplate = require('./Player.handlebars');
    var playerFrameTotalTemplate = require('./PlayerFrameTotal.handlebars');

    function PlayerModel(name) {
        this.name = name;
        this.total = '';
        this.points = [];

        // maybe change frametotal value or prop
        for(var i = 0; i < 10;i++){
            if (i == 9){
                this.points.push({first: '', second: '', lastFrame: true, frameTotal: '', mark: '', updated: '', updatedTwice:''});
            } else {
                this.points.push({first: '', second: '', frameTotal: '', mark: '', updated: '', updatedTwice:''});
            }
        }
    }

    PlayerModel.prototype.create = function () {
        var activeGame = JSON.parse(localStorage['activeGame']);
        activeGame.players.push(this);
        localStorage['activeGame'] = JSON.stringify(activeGame);
    };


    PlayerModel.prototype.update = function (playerObjectData) {
        var currentPlayerFrame = this.points[playerObjectData.currentFrameMinusOne];
        var numberOfThrow = playerObjectData.numberOfThrow;
        var currentPoint = playerObjectData.currentPoint;

        var allowedIntegers = [0,1,2,3,4,5,6,7,8,9];
        if (currentPoint == '/'){
            currentPlayerFrame[numberOfThrow] = currentPoint;
            currentPlayerFrame.mark = currentPoint;
            currentPlayerFrame.frameTotal = 10;
        } else if(currentPoint == 'x' || currentPoint == 'X') {
            currentPlayerFrame[numberOfThrow] = currentPoint;
            currentPlayerFrame.mark = currentPoint;
            currentPlayerFrame.frameTotal = 10;
        } else if (parseInt(currentPoint) in allowedIntegers){
            // maybe get it for some func
            if (numberOfThrow == 'first'){
                currentPlayerFrame[numberOfThrow] = currentPoint;
                currentPlayerFrame.frameTotal = currentPlayerFrame.first*1 +  currentPlayerFrame.second*1;
            } else if (numberOfThrow == 'second') {
                currentPlayerFrame[numberOfThrow] = currentPoint;
                currentPlayerFrame.frameTotal = currentPlayerFrame.first*1 +  currentPlayerFrame.second*1;
            }

        }
        this.calculateFrameTotal(playerObjectData.currentFrameMinusOne, currentPoint);
        this.save();

    };

    PlayerModel.prototype.calculateFrameTotal = function(currentFrameMinusOne, currentPoint){

        var previousFrame;
        var previousPreviousFrame;
        if (currentFrameMinusOne >= 1){
            previousFrame = this.points[currentFrameMinusOne-1];
            if (previousFrame.mark == '/'){
                console.log('previousFrame', previousFrame);
                console.log('previousFrame.frameTotal', previousFrame.frameTotal);
                if (!previousFrame.updated) {
                    previousFrame.updated = true;
                    previousFrame.frameTotal += parseInt(currentPoint) || 10;
                }
                console.log('previousFrame.frameTotal', previousFrame.frameTotal);
            }
            if (previousFrame.mark == 'x' ||  previousFrame.mark == 'X'){
                if (!previousFrame.updated) {
                    previousFrame.updated = true;
                    previousFrame.frameTotal += parseInt(currentPoint) || 10;
                }
            }
            if (currentFrameMinusOne >= 2){
                previousPreviousFrame = this.points[currentFrameMinusOne-2];
                if (previousPreviousFrame.mark == 'x' ||  previousPreviousFrame.mark == 'X'){
                    if (!previousPreviousFrame.updatedTwice) {
                        previousPreviousFrame.updatedTwice = true;
                        previousPreviousFrame.frameTotal += parseInt(currentPoint) || 10;
                    }
                }
            }
        }
        this.calculateTotal();
    };

    PlayerModel.prototype.save = function () {
        var activeGame = JSON.parse(localStorage['activeGame']);
        console.log(activeGame.players);
        for (var i = 0; i < activeGame.players.length; i++){
            if (this.name === activeGame.players[i].name){
                console.log('this.name === activeGame.players[i].name');
                activeGame.players.splice(i,1, this);
            }
        }
        console.log(activeGame.players);
        localStorage['activeGame'] = JSON.stringify(activeGame);
    };

    PlayerModel.prototype.calculateTotal = function (currentPlayerFrame, numberOfThrow, currentPoint) {
        this.total = 0;

        for (var i = 0; i < this.points.length; i++){
            if (this.points[i].frameTotal){
                this.total += parseInt(this.points[i].frameTotal);
            }
        }
        console.log('this.total', this.total);

    };

    PlayerModel.prototype.getPlayerHTML = function() {
        //console.log('player in getPlayerHTML', this)
        // this should be in the view
        var html = playerTemplate(this);
        //console.log('html',html);
        return html;

    };

    PlayerModel.prototype.getFrameTotalHTML = function() {
        //console.log('player in getPlayerHTML', this)
        // this should be in the view
        var html = playerFrameTotalTemplate(this);
        //console.log('html',html);
        return html;

    };

    return PlayerModel;

};