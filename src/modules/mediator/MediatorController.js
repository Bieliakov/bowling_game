module.exports = function(Player, scoreboard, window) {

    var MediatorView = require('./MediatorView.js')(window);
    var MediatorModel = require('./MediatorModel.js')(window);

    function MediatorController(){
        var self = this;
        this.view = new MediatorView();
        this.model = new MediatorModel();

        this.init = function () {
            var flag = confirm('Хотите заполнить результаты игры в боулинг?');

            if (flag){

                self.model = new MediatorModel();
                self.model.save();
                self.view.showPopup();

                self.view.bind('clickAddPlayerButton',
                    function(name){
                        var player = new Player(name);
                        self.model.players.push(player);
                        //player.model.save();
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
                )

            } else {
                // change it for results page
                alert('Возвращайтесь, когда заходите');
            }
        };
    }

    MediatorController.prototype.initScoreBoard = function (playersArray) {
        console.log('playersArray', playersArray)
        var playerHTMLsArray = [];
        for (var i = 0; i < playersArray.length;i++){
            var playerHTML = playersArray[i].model.getPlayerHTML();
            console.log('playerHTML', playerHTML);
            playerHTMLsArray.push(playerHTML);
        }
        console.log('scoreboard', scoreboard);
        console.log('playerHTMLsArray', playerHTMLsArray)
        scoreboard.init(playerHTMLsArray);
    };

    //MediatorController.prototype.played = function () {
    //    var players = this.players,
    //        score = {
    //            Home: players.home.points,
    //            Guest: players.guest.points
    //        };
    //    scoreboard.update(score);
    //};

    return MediatorController;
};