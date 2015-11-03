module.exports = function(){

    function ScoreboardModel() {
        this.players = [];
        // change this
        this.id = Math.random()*10000000000000;
    }

    ScoreboardModel.prototype.save = function () {

    };

    return ScoreboardModel;

};