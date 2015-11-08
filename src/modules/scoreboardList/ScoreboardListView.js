module.exports = function () {

    var template = require('./Scoreboard.handlebars');

    function ScoreboardView() {
        this.template = template;
    };

    ScoreboardView.prototype.bind = function (event, handler) {
        if(event === 'changeResultsQuantity'){
            if (!this.$resultsQuantityInput){
                this.$resultsQuantityInput = document.querySelector('[data-game=input-quantity]');
            }
            console.log('this.$resultsQuantityInput', this.$resultsQuantityInput);
            this.$resultsQuantityInput.addEventListener('input', function (evt) {
                handler(evt);
            });
        }
    };

    ScoreboardView.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            showGames: function (gamesArray) {
                if (!self.$resultsWrapper){
                    self.$resultsWrapper = document.querySelector('[data-game=previous-results]');
                }
                //console.log('gamesArray', gamesArray);
                //console.log('self.$resultsWrapper', self.$resultsWrapper)
                var html = self.template(gamesArray);
                //console.log('html',html)

                self.$resultsWrapper.innerHTML = html;
            }
        };

        viewCommands[viewCmd](data);

    };

    return ScoreboardView;

};