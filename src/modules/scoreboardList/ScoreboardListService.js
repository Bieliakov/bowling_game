module.exports = function () {

    function ScoreboardListService() {
        this.storage = window.localStorage;
    }

    ScoreboardListService.prototype.getGames = function(){
        var savedGames;
        if (this.storage['savedGames']){
            savedGames = JSON.parse(this.storage['savedGames']);
        }
        return savedGames;
    };

    return ScoreboardListService;

};