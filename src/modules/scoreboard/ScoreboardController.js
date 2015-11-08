module.exports = function(events){

    var View = require('./ScoreboardView.js')(events);
    var Model = require('./ScoreboardModel.js')();

    function ScoreboardController(){
        this.model = new Model();
        this.view = new View();

        this.view.bind('getInputData', function(){

        });
    }

    ScoreboardController.prototype.init = function(playerHTMLsArray, playersArray){
        //console.log('ScoreboardController.prototype.init playerHTMLsArray', playerHTMLsArray);
        var self = this;
        this.view.render('init', {playerHTMLsArray: playerHTMLsArray});
        this.view.render('initCalcButtons', {addCalcButtonSet: self.model.activeGameBool, allButtons: self.model.allButtons});
        this.view.initView(playersArray[0].model.name);
        this.view.bind('clickEditableElement',
            function(playerObjectData){
                events.publish('updatePlayer', playerObjectData);
            },
            function(playerName, $clickedElement){
                var nextPlayerName;
                var nextFrame;
                for (var i = 0; i < playersArray.length; i++){
                    if (i === playersArray.length - 1){
                        nextFrame = true;
                        nextPlayerName = playersArray[0].model.name;
                        return self.view.goToNextElement($clickedElement, nextPlayerName, nextFrame);
                    } else if (playerName == playersArray[i].model.name){
                        nextPlayerName = playersArray[i+1].model.name;
                        return self.view.goToNextElement($clickedElement, nextPlayerName);
                    }
                }
            }
        );


    };

    ScoreboardController.prototype.update = function(playerFrameTotalHTML, playerName, playerTotal){
        // not so good passing player to scoreboard
        //console.log('playerFrameTotalHTML',playerFrameTotalHTML)
        this.view.render('updatePlayer', {playerFrameTotalHTML: playerFrameTotalHTML, playerName: playerName, playerTotal: playerTotal});

    };

    return ScoreboardController;

};