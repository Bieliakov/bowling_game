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
                    for (var i = 0; i < savedGames.length; i++){
                        var mediatorController = new MediatorController();
                        mediatorController.model.players = savedGames[i].players;
                        mediatorController.initScoreBoard(mediatorController.model.players);
                        //this.view.render()
                    }
                }).bind(this));
            }
        }
    };

    return ScoreboardListController;

};