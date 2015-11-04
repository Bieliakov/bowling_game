module.exports = function () {

    var scoreboardTemplate = require('./Scoreboard.handlebars');

    function ScoreboardView() {
        this.template = scoreboardTemplate;

        this.scoreboard = document.querySelector('[data-game=scoreboard]');

    }

    ScoreboardView.prototype.bind = function (event, handler){
        if (event === 'clickEditableElement'){

            this.scoreboard.addEventListener('keydown', function(evt){
                if (evt.target.hasAttribute('contenteditable')){

                    var keyCode = evt.keyCode || evt.which;
                    var clickedElement = evt.target;
                    var currentPoint = clickedElement.innerHTML;
                    var playerName = clickedElement.getAttribute('data-model');
                    var currentFrame = clickedElement.getAttribute('data-currentFrame');

                    currentFrame++; // due to 0-based indexing

                    if (keyCode == 27){
                        // restore state
                        document.execCommand('undo');
                        clickedElement.blur();
                    } else if (keyCode == 13){

                        handler(playerName, currentFrame, currentPoint);
                        clickedElement.blur();
                        evt.preventDefault();
                    }

                    console.log('has contenteditable ande changed');
                }
            });
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