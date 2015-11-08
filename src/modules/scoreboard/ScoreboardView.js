module.exports = function (events) {

    var scoreboardTemplate = require('./Scoreboard.handlebars');
    var scoreboardButtonsTemplate = require('./ScoreboardButtons.handlebars');
    function ScoreboardView() {
        this.templates = {scoreboardTemplate: scoreboardTemplate, scoreboardButtonsTemplate: scoreboardButtonsTemplate};
        this.validValues = ['0','1','2','3','4','5','6','7','8','9','/','X', 'x'];
        this.numberOfPlayers = 0;
        this.elementsWithoutReadOnly = [];
        this.visibleErrors = [];
        this.gameEnded = false;

    }

    ScoreboardView.prototype.initView = function (firstPlayerName) {

        var selector = firstPlayerName + 'frame0first';
        var element = document.getElementById(selector);
        this.getFocusToElement(element);

    };

    ScoreboardView.prototype.checkErrors = function ($element) {
        var validVeluesSecondThrow = ['0','1','2','3','4','5','6','7','8','9'];
        // if error - return false or error;
        var errorText = 'Пожалуйста, введите одно из значений ' + this.validValues.join(', ');
        var currentPointString = $element.value;
        var playerName = $element.getAttribute('data-model');
        // due to 0-based array indexing
        var currentFrameMinusOne = $element.getAttribute('data-currentFrame');
        var numberOfThrow = $element.getAttribute('data-position');

        var selectorFirstElement = playerName + 'frame' + currentFrameMinusOne + 'first';
        var $elementFirstThrow = document.getElementById(selectorFirstElement);
        var valueFirstThrow = parseInt($elementFirstThrow.value);

        if (numberOfThrow == 'first'){
            if (currentPointString == '/'){

                errorText = 'Возможно x, а не "/"? :)';
                return errorText;
            }
            for (var i = 0; i < this.validValues.length; i++){
                if (currentPointString === this.validValues[i]){
                    return false;
                }
            }
        } else if (numberOfThrow == 'second'){
            if (currentPointString == '/'){
                return false;
            } else if (currentPointString == 'x' || currentPointString == 'X'){
                errorText = 'Возможно /, а не "x"? :)';
                return errorText;
            }

            for (var i = 0; i < validVeluesSecondThrow.length; i++){
                if (currentPointString == validVeluesSecondThrow[i]){
                    console.log('currentPoint + valueFirstThrow' , currentPointString + valueFirstThrow)
                    if (parseInt(currentPointString) + valueFirstThrow < 10){
                        return false;
                    } else {
                        errorText = 'Сумма значений за кидки не может превышать 9 в цифрах';
                        return errorText;
                    }
                }
            }
        }

        return errorText;
    };

    ScoreboardView.prototype.showErrors = function ($element, errorText) {

        if (!this.$resultTableError){
            this.$resultTableError = document.querySelector('[data-result=result-table-error]');
        }

        this.$resultTableError.innerHTML = errorText;
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

            this.$scoreboard.addEventListener('keyup', function(evt){
                var $clickedElement = evt.target;

                var $nextElement;
                if ($clickedElement.getAttribute('data-editable-result') == 'true'){
                    //console.log(evt.target.getAttribute('data-editable-result'));
                    var keyCode = evt.keyCode || evt.which;
                    var currentPoint = $clickedElement.value;

                    if (keyCode == 8) {
                        $clickedElement.value = '';
                        self.hideErrors($clickedElement);
                        return;
                    }

                    var playerName = $clickedElement.getAttribute('data-model');
                // due to 0-based array indexing
                    var currentFrameMinusOne = $clickedElement.getAttribute('data-currentFrame');
                    var numberOfThrow = $clickedElement.getAttribute('data-position');

                    var errorText = self.checkErrors($clickedElement);

                    if (errorText){
                        return self.showErrors($clickedElement, errorText);
                    } else {

                        self.hideErrors($clickedElement);
                        checkCallback(playerName, $clickedElement);

                    }

                    var playerObjectData = {};
                    playerObjectData.playerName = playerName;
                    playerObjectData.currentFrameMinusOne = currentFrameMinusOne;
                    playerObjectData.currentPoint = currentPoint;
                    playerObjectData.numberOfThrow = numberOfThrow;
                    handler(playerObjectData);

                }
            });
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
        var nextFrameNumber = parseInt(currentFrameMinusOne) + 1;


        if (previousNumberOfPoints == 0 || previousNumberOfPoints == 1 || previousNumberOfPoints == 2 ||
            previousNumberOfPoints == 3 || previousNumberOfPoints == 4 || previousNumberOfPoints == 5 ||
            previousNumberOfPoints == 6 || previousNumberOfPoints == 7 || previousNumberOfPoints == 8 ||
            previousNumberOfPoints == 9){

            if (numberOfThrow === 'first'){

                selector = playerName + 'frame' + currentFrameMinusOne + 'second';
                console.log('selector', selector)
            } else if (numberOfThrow === 'second' && nextFrame){

                selector = nextPlayerName + 'frame' + nextFrameNumber + 'first';
            } else if (numberOfThrow === 'second'){

                selector = nextPlayerName + 'frame' + currentFrameMinusOne + 'first';
            }

        } else if (previousNumberOfPoints == '/'){
            if (numberOfThrow === 'first'){

            } else if (numberOfThrow === 'second' && nextFrame){

                selector = nextPlayerName + 'frame' + nextFrameNumber + 'first';
            } else if (numberOfThrow === 'second'){
                selector = nextPlayerName + 'frame' + currentFrameMinusOne + 'first';
            }

        } else if ((previousNumberOfPoints == 'x') || (previousNumberOfPoints == 'X')){
            if (nextFrame){
                selector = nextPlayerName + 'frame' + nextFrameNumber + 'first';
            } else {
                selector = nextPlayerName + 'frame' + currentFrameMinusOne + 'first';
            }
        }
        $nextElement = document.getElementById(selector);
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
            },
            updatePlayer: function(data){
                var selector = data.playerName + 'FrameTotal';
                self.$currentPlayerFrameTotal = document.getElementById(selector);
                self.$currentPlayerFrameTotal.innerHTML = data.playerFrameTotalHTML;
                var selectorForTotal = data.playerName + 'playerTotal';
                self.$currentPlayerTotal = document.getElementById(selectorForTotal);
                self.$currentPlayerTotal.innerHTML = data.playerTotal;

            }
        };

        viewCommands[viewCmd](data);

    };

    ScoreboardView.prototype.getFocusToElement = function ($element) {
        if (!$element){
            this.addReadOnlyAttributes()
            // it's not right to do it from view
            events.publish('endCurrentGame');
        } else {
            this.elementsWithoutReadOnly.push($element);
            $element.readOnly = false;
            $element.focus();
        }
    };

    ScoreboardView.prototype.addReadOnlyAttributes = function () {
        this.elementsWithoutReadOnly.forEach(function(v,i,a){
            a[i].readOnly = true;
        });
        this.elementsWithoutReadOnly = [];
    };

    return ScoreboardView;
};