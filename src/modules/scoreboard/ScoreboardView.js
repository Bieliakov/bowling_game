module.exports = function () {

    var scoreboardTemplate = require('./Scoreboard.handlebars');
    var scoreboardButtonsTemplate = require('./ScoreboardButtons.handlebars');
    function ScoreboardView() {
        this.templates = {scoreboardTemplate: scoreboardTemplate, scoreboardButtonsTemplate: scoreboardButtonsTemplate};
        this.validValues = ['0','1','2','3','4','5','6','7','8','9','/','X', 'x'];
        this.numberOfPlayers = 0;
        this.visibleErrors = [];
    }

    ScoreboardView.prototype.initView = function (firstPlayerName) {

        var selector = firstPlayerName + 'frame0first';
        var element = document.getElementById(selector);
        this.getFocusToElement(element);

    };

    ScoreboardView.prototype.checkErrors = function ($element) {
        var flag = true;
        console.log('$element.value', $element.value)
        for (var i = 0; i < this.validValues.length; i++){
            if (($element.value) === this.validValues[i]){
                flag = false;
            }
        }
        return flag;
    };

    ScoreboardView.prototype.showErrors = function ($element) {
        if (!this.$resultTableError){
            this.$resultTableError = document.querySelector('[data-result=result-table-error]');
        }

        var text = 'Пожалуйста, введите одно из значений ' + this.validValues.join(', ');
        this.$resultTableError.innerHTML = text;
        this.$resultTableError.classList.remove('is-not-displayed');
        this.visibleErrors.push(this.$resultTableError);
        $element.classList.add('is-error-container');
    };

    ScoreboardView.prototype.hideErrors = function ($element) {
        if (!this.$resultTableError){
            this.$resultTableError = document.querySelector('[data-result=result-table-error]');
        }

        //this.$resultTableError.classList.add('is-not-displayed');
        for (var i = this.visibleErrors.length - 1; i >= 0; i--){
            this.visibleErrors[i].classList.add('is-not-displayed');
            this.visibleErrors.pop();
        }

        $element.classList.remove('is-error-container');
    };

    ScoreboardView.prototype.bind = function (event, handler, checkCallback){
        var self = this;

        if (event === 'clickEditableElement'){
            if (!this.$scoreboard){
                this.$scoreboard = document.querySelector('[data-game=scoreboard]');
            }


            this.$scoreboard.addEventListener('input', function(evt){
                var $clickedElement = evt.target;
                var $nextElement;
                if ($clickedElement.getAttribute('data-editable-result') == 'true'){
                    //console.log(evt.target.getAttribute('data-editable-result'));

                    var checkedCurrentField = self.checkErrors($clickedElement);
                    console.log('checkedCurrentField', checkedCurrentField);

                    if (checkedCurrentField){
                        return self.showErrors($clickedElement);
                    } else {
                        var playerName = $clickedElement.getAttribute('data-model');
                        self.hideErrors($clickedElement);
                        checkCallback(playerName, $clickedElement);

                    }

                    var keyCode = evt.keyCode || evt.which;

                    var currentPoint = $clickedElement.innerHTML;



                    var playerName = $clickedElement.getAttribute('data-model');

                    // due to 0-based array indexing
                    var currentFrameMinusOne = $clickedElement.getAttribute('data-currentFrame');

                    var numberOfThrow = $clickedElement.getAttribute('data-position');

                    if (keyCode == 27){
                        // restore state
                        document.execCommand('undo');
                        $clickedElement.blur();
                    } else if (keyCode == 13){
                        var playerObjectData = {};
                        playerObjectData.playerName = playerName;
                        playerObjectData.currentFrameMinusOne = currentFrameMinusOne;
                        playerObjectData.currentPoint = currentPoint;
                        playerObjectData.numberOfThrow = numberOfThrow;
                        handler(playerObjectData);
                        $clickedElement.blur();
                        evt.preventDefault();
                    }

                    console.log('has contenteditable ande changed');
                }
            });
        }

        if (event === 'getInputData'){

        }
    };

    ScoreboardView.prototype.goToNextElement = function($previousElement, nextPlayerName, nextFrame){

        var previousNumberOfPoints = $previousElement.value;
        var $nextElement;
        var selector;
        var playerName = $previousElement.getAttribute('data-model');
        // due to 0-based array indexing
        var currentFrameMinusOne = $previousElement.getAttribute('data-currentFrame');

        var numberOfThrow = $previousElement.getAttribute('data-position');



        if (previousNumberOfPoints == 0 || previousNumberOfPoints == 1 || previousNumberOfPoints == 2 ||
            previousNumberOfPoints == 3 || previousNumberOfPoints == 4 || previousNumberOfPoints == 5 ||
            previousNumberOfPoints == 6 || previousNumberOfPoints == 7 || previousNumberOfPoints == 8 ||
            previousNumberOfPoints == 9){

            if (numberOfThrow === 'first'){

                selector = playerName + 'frame' + currentFrameMinusOne + 'second';
                console.log('selector', selector)
            } else if (numberOfThrow === 'second' && nextFrame){
                var nextFrameNumber = parseInt(currentFrameMinusOne) + 1;
                selector = nextPlayerName + 'frame' + nextFrameNumber + 'first';
            } else if (numberOfThrow === 'second'){

                selector = nextPlayerName + 'frame' + currentFrameMinusOne + 'first';
            }
            $nextElement = document.getElementById(selector);
        }
        this.getFocusToElement($nextElement)

    };

    ScoreboardView.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            init: function (playerHTMLsArray) {
                if (!self.$scoreboard){
                    self.$scoreboard = document.querySelector('[data-game=scoreboard]');
                }
                self.numberOfPlayers = playerHTMLsArray.length;
                //console.log(playerHTMLsArray);
                var html = self.templates.scoreboardTemplate(playerHTMLsArray);
                self.$scoreboard.innerHTML = html;
            },
            initCalcButtons: function (data){
                if (!self.$scoreboard){
                    self.$scoreboard = document.querySelector('[data-game=scoreboard]');
                }
                var HTMLstring = self.templates.scoreboardButtonsTemplate({addCalcButtonSet: data.addCalcButtonSet, allButtons: data.allButtons });
                var fragment = document.createDocumentFragment();
                var temp = document.createElement('template');
                temp.innerHTML = HTMLstring;

                fragment = temp.content;
                //console.log('html!!', html);
                console.log('fragment', fragment);
                self.$scoreboard.appendChild(fragment);
            }
        };

        viewCommands[viewCmd](data);

    };

    ScoreboardView.prototype.getFocusToElement = function ($element) {
        $element.readOnly = false;
        $element.focus();

    };


    return ScoreboardView;
};