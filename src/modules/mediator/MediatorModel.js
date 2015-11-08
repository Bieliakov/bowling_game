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

    MediatorModel.prototype.updatePlayers = function (playerObjectData, callback) {


        console.log('playerObjectData', playerObjectData);

        for (var i = 0; i < this.players.length; i++){
            if (this.players[i].model.name == playerObjectData.playerName){
                console.log('this.players[i].model', this.players[i].model);

                this.players[i].model.update(playerObjectData);
                break;
            }
        }
        callback(this.players[i].model);

    };


    MediatorModel.prototype.saveCurrentGame = function () {

        console.log(JSON.stringify(this));
        window.localStorage['activeGame'] = JSON.stringify(this);

    };

    MediatorModel.prototype.saveGame = function () {
        console.log('this.totalPoints', this.totalPoints)
        this.calculateGameTotal();
        console.log('this.totalPoints', this.totalPoints)
        var savedGames;

        if (!window.localStorage['savedGames']){
            savedGames = [];
        } else {
            savedGames = JSON.parse(window.localStorage['savedGames']);
        }

        for (var i=0; i < savedGames.length; i++){
            if (this.id == savedGames[i].id){
            return;}
        }

        savedGames.push(this);
        window.localStorage['savedGames'] = JSON.stringify(savedGames);
        console.log(JSON.stringify(this));

    };

    MediatorModel.prototype.calculateGameTotal = function () {
        for (var i = 0; i < this.players.length; i++){
            this.totalPoints += this.players[i].model.total;
        }
    };

    function getID(){
        // not so good solution, but a quick one :)
        var date = new Date();
        var dateValue = date.valueOf();
        return dateValue;
    }

    return MediatorModel;

};