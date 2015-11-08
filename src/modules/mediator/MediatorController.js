module.exports = function(Player, ScoreboardController, window, events) {

    var MediatorView = require('./MediatorView.js')(window, events);
    var MediatorModel = require('./MediatorModel.js')(window);

    function MediatorController(){
        var self = this;
        this.view = new MediatorView();
        this.model = new MediatorModel();

        this.init = function () {

            self.model = new MediatorModel();
            self.model.saveCurrentGame();
            self.view.showPopup();

            self.view.bind('clickAddPlayerButton',
                function(name){
                    var player = new Player(name);
                    self.model.players.push(player);
                    player.model.create();
                    console.log('self.model', self.model);
                },
                function(errorsArray){
                    if (errorsArray.length){
                        self.view.render('renderErrors', errorsArray);
                    }
                }
            );

            self.view.bind('clickStartGameButton',
                function(){
                    self.initScoreBoard(self.model.players);
                    //console.log('self.model', self.model)
                }
            );

            events.subscribe('updatePlayer', function (playerObjectData){
                self.model.updatePlayers(playerObjectData, function(updatedPlayer){
                    self.updateScoreboard(updatedPlayer);
                });
            });

            events.subscribe('endCurrentGame', function (){
                self.model.saveGame();
            });

        };
    }

    MediatorController.prototype.initScoreBoard = function (playersArray) {
        var self = this;
        //console.log('playersArray', playersArray)
        var playerHTMLsArray = [];
        for (var i = 0; i < playersArray.length;i++){
            var playerHTML = playersArray[i].model.getPlayerHTML();
            //console.log('playerHTML', playerHTML);
            playerHTMLsArray.push(playerHTML);
        }
        //console.log('scoreboard', scoreboard);
        //console.log('playerHTMLsArray', playerHTMLsArray)

        this.scoreboard = new ScoreboardController()
        this.scoreboard.init(playerHTMLsArray, playersArray);
    };

    MediatorController.prototype.updateScoreboard = function (updatedPlayer) {

        var playerFrameTotalHTML = updatedPlayer.getFrameTotalHTML();
        console.log('updatedPlayer', updatedPlayer)

        this.scoreboard.update(playerFrameTotalHTML, updatedPlayer.name, updatedPlayer.total);
    };

    return MediatorController;
};