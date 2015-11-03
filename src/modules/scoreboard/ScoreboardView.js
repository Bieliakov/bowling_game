module.exports = function () {

    var scoreboardTemplate = require('./Scoreboard.handlebars');

    function ScoreboardView() {
        this.template = scoreboardTemplate;

        this.scoreboard = document.querySelector('[data-game=scoreboard]');

    }

    ScoreboardView.prototype.bind = function (event, handler){
        if (event === 'clickEditableElement'){
            this.scoreboard.onclick = function(evt){
                if (evt.target.hasAttribute('contenteditable')){
                    console.log('has contenteditable')
                }
            }
        }

        if (event === 'getInputData'){

        }
    };

    ScoreboardView.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            init: function (playerHTMLsArray) {
                var html = self.template({players: playerHTMLsArray});
                self.scoreboard.innerHTML = html;
            }
        };

        viewCommands[viewCmd](data);

    };

    return ScoreboardView;
};