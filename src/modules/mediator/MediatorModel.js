module.exports = function(window){

    function MediatorModel() {
        this.id = getID();
        this.totalPoints = 0;
        this.players = [];
    }

    MediatorModel.prototype.play = function () {
        //this.points.push(Math.floor(Math.random()) * 11);
        //window.app.libraries.mediator.played();
    };

    MediatorModel.prototype.getActiveGameObject = function () {
        var activeGame = JSON.parse(window.localStorage['activeGame']);
        if (this.players.length !== activeGame.players.length) {
            this.players = [];
            for (var i = 0; i < activeGame.players.length; i++){
                this.players.push(activeGame.players[i]);
            }
        }
        //console.log(this.players);
        return activeGame;
    };

    MediatorModel.prototype.updatePlayers = function (playerObjectData) {


        console.log('playerObjectData', playerObjectData)

        for (var i = 0; i < this.players.length; i++){
            if (this.players[i].model.name == playerObjectData.playerName){
                console.log('this.players[i].model', this.players[i].model);

                this.players[i].model.update(playerObjectData);
                break;
            }
        }


    };


    MediatorModel.prototype.save = function () {
        console.log(JSON.stringify(this));
        window.localStorage['activeGame'] = JSON.stringify(this);
        ////console.log('window in save func', window);
        ////console.log('localStorage', localStorage);
        //var activeGame = JSON.parse(localStorage['activeGame']);
        //var player = {};
        //player.name = this.name;
        //player.points = this.points;
        //activeGame.push(player);
        ////console.log('player', player);
        ////console.log('activeGame', activeGame);
        //localStorage['activeGame'] = JSON.stringify(activeGame);
    };

    function getID(){
        // not so good solution, but a quick one :)
        var date = new Date();
        var dateValue = date.valueOf();
        return dateValue;
    }

    return MediatorModel;

};