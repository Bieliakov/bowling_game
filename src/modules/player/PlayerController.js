module.exports = function(){

    var Model = require('./PlayerModel.js')();
    var View = require('./PlayerView.js')();

    function PlayerController(name){
        this.model = new Model(name);
        this.view = new View();
    }

    return PlayerController;
};