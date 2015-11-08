module.exports = function(){

    function checkActiveGame(){
        var activeGame;
        if (window.localStorage['activeGame']){
            activeGame = JSON.parse(window.localStorage['activeGame']);
            if (activeGame.id){
                return true;
            }
        } else return false;

    }

    function ScoreboardModel() {
        this.activeGameBool = checkActiveGame();
    }

    ScoreboardModel.prototype.create = function () {

    };

    ScoreboardModel.prototype.save = function () {

    };

    return ScoreboardModel;

};