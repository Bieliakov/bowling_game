module.exports = function (MediatorController) {

    var Service       = require('./ScoreboardListService.js')();
    var View        = require('./ScoreboardListView.js')();

    function ScoreboardListController() {
        this._inited = false;
        //this.mediator = new MediatorController();
        this.service = new Service();
        this.view = new View();


    }

    ScoreboardListController.prototype = {

        init: function() {
            if (!this._inited) {
                this._inited = true;
                this.view.bind('changeResultsQuantity',(function(evt){
                    var quantity = evt.target.value;

                    var savedGames = this.service.getGames();
                    console.log('savedGames',savedGames);
                    var smallerQuantity = quantity > savedGames.length ? savedGames.length : quantity;
                    var topGamesArray = savedGames.sort(function(obj1, obj2){ return parseInt(obj2.totalPoints)-parseInt(obj1.totalPoints);});

                    topGamesArray.length = smallerQuantity;
                    console.log('topGamesArray',topGamesArray);
                    //for (var i = 0; i < smallerQuantity; i++){
                    //for (var i = 0; i < savedGames.length; i++){
                    //    var gameTotal = savedGames[i].totalPoints;
                    //    //var mediatorController = new MediatorController();
                    //    //mediatorController.model.players = savedGames[i].players;
                    //    //mediatorController.initScoreBoard(mediatorController.model.players);
                    //
                    //
                    //}
                    this.view.render('showGames', {topGamesArray: topGamesArray});
                }).bind(this));
            }
        }
    };

    return ScoreboardListController;

};