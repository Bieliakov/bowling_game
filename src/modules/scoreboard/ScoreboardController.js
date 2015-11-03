module.exports = function(){

    var View = require('./ScoreboardView.js')();

    function ScoreboardController(){
        this.view = new View();

        this.view.bind('getInputData', function(){

        });
    }

    ScoreboardController.prototype.init = function(playerHTMLsArray){
        console.log('ScoreboardController.prototype.init playerHTMLsArray', playerHTMLsArray);
        this.view.render('init', playerHTMLsArray);
        this.view.bind('clickEditableElement');

    };

    ScoreboardController.prototype.update = function(score){
        console.log('in ScoreboardController.prototype.update with score', score);
        this.view.render('update', score);

    };

    return ScoreboardController;

};