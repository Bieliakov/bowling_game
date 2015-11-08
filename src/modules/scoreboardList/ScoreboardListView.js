module.exports = function () {

    var template = require('./Scoreboard.handlebars');

    function View() {

        this.template = template;

    }

    View.prototype.render = function(viewCmd, data) {

        var self = this;

        var viewCommands = {
            showLoading : function() {
                self.$viewPort.innerHTML = self.templates.loading();
            }
        };

        viewCommands[viewCmd](data);
    };

    View.prototype.bind = function (event, handler) {
        if(event === 'changeResultsQuantity'){
            if (!this.$resultsQuantityInput){
                this.$resultsQuantityInput = document.querySelector('[data-game=input-quantity]');
            }
            console.log('this.$resultsQuantityInput', this.$resultsQuantityInput);
            this.$resultsQuantityInput.addEventListener('keyup', function (evt) {
                handler(evt);
            });
        }
    };

    return View;

};