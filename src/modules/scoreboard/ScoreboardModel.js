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
        //this.allButtons = ['0','1','2','3','4','5','6','7','8','9','/','X'];
        //this.activeButtons = new Array(this.allButtons.length);
        // change this
        this.id = Math.random()*10000000000000;
    }

    ScoreboardModel.prototype.create = function () {

    };

    ScoreboardModel.prototype.save = function () {

    };

    return ScoreboardModel;

};