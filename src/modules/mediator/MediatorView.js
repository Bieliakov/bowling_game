module.exports = function () {

    function MediatorView() {
        this.visibleElements = [];
        this.visibleErrors = [];
    }

    MediatorView.prototype.bind = function (event, handler, handlerInvalidData){

        var self = this;

        if (event === 'clickAddPlayerButton'){
            if (!this.$playerSubmitButton) {
                this.$playerSubmitButton = document.querySelector('[data-player=form-name-add]');
            }

            if (!this.$playerInputName) {
                this.$playerInputName = document.querySelector('[data-player=form-input-name]');
            }

            this.$playerSubmitButton.onclick = function(evt) {

                evt.preventDefault();
                var name = self.$playerInputName.value;
                var form = 'player';

                self.removeErrorsFromForm();

                var checkedFieldsOrErrors = checkAuthorizationFields(name, form);

                if (checkedFieldsOrErrors !== true) {
                    return handlerInvalidData(checkedFieldsOrErrors);
                } else {
                    self.increasePlayerNumber();
                    self.clearInput();
                    self.$playerInputName.focus();
                    handler(name);
                }
            }

        }

        if (event === 'clickStartGameButton'){
            if (!this.$playerStartGameButton) {
                this.$playerStartGameButton = document.querySelector('[data-player=form-game-start]');
            }

            this.$playerStartGameButton.onclick = function(evt) {

                evt.preventDefault();
                self.removeErrorsFromForm();
                self.clearInput();
                self.hideVisibleElements();
                handler();
            }

        }

        function checkAuthorizationFields(name, form){
            if(!name){
                return invalidData('name', form);
            }

            var regexForNameValidation =
                /^[a-zA-Z0-9._\u00A1-\uFFFF]{3,25}$/i;

            if(!regexForNameValidation.test(name)){
                return invalidData('name wrong', form);
            }

            return true;
        }

        function invalidData(type, form){
            var errors = [];
            var text;
            if (type === 'name'){
                text = 'Введите ваше имя.';
                errors.push(new CustomError(type, text, form));
            } else if (type === 'name wrong') {
                text = 'Некорректное имя.';
                errors.push(new CustomError(type, text, form));
            }
            return errors;
        }

        function CustomError(type, text, form){
            this.type = type;
            this.text = text;
            this.form = form;
        }

        //if (event === 'getInputData'){
        //    this.$playerInputName = document.querySelector('[data-player=form-input-name]');
        //    this.$playerInputName.addEventListener = function(evt){
        //
        //    }
        //}
    };

    MediatorView.prototype.clearInput = function(){
        this.$playerInputName.value = '';
    };

    MediatorView.prototype.hideVisibleElements = function(){
        var self = this;

        console.log(this.visibleElements);

        //if (!this.visibleElements.length){
        //    return;
        //}s

        for (var i = 0; i < self.visibleElements.length; i++){
            self.visibleElements[i].classList.add('is-not-displayed');
        }

        self.visibleElements = [];

    };

    MediatorView.prototype.increasePlayerNumber = function(){
        if (!(this.playerNumber)){
            this.playerNumber = document.querySelector('[data-player=player-number]');
        }

        var currentNumber = this.playerNumber.innerHTML;
        currentNumber++;
        this.playerNumber.innerHTML = currentNumber;
    };

    MediatorView.prototype.render = function (viewCmd, data) {

        var self = this;

        var viewCommands = {
            renderErrors: function(errorsArray){

                if (!self.$ErrorInputName){
                    self.$ErrorInputName = document.querySelector('[data-player=form-input-name-error]');
                }
                //console.log('in renderErrors func');
                for (var i = 0; i < errorsArray.length; i++){
                    //console.log('errorsArray[i]', errorsArray[i]);
                    if (errorsArray[i].form === 'player') {
                        if (errorsArray[i].type === 'name' || errorsArray[i].type === 'name wrong') {
                            self.handleErrorAddition(self.$ErrorInputName, errorsArray[i]);
                        }
                    }
                }
            }
        };
        viewCommands[viewCmd](data);
    };

    MediatorView.prototype.handleErrorAddition = function(node, currentError){
        node.classList.remove('is-not-displayed');
        node.innerHTML = currentError.text;
        this.visibleErrors.push(node);
    };

    MediatorView.prototype.showPopup = function(){
        if (!this.$promptPlayerFormWrapper){
            this.$promptPlayerFormWrapper = document.querySelector('[data-player=form-wrapper]');
        }
        if (!this.$promptPlayerFormBackground){
            this.$promptPlayerFormBackground = document.querySelector('[data-player=popup-background]');
        }

        if (!this.$promptPlayerForm){
            this.$promptPlayerForm = document.querySelector('[data-player=form]');
        }

        this.$promptPlayerFormWrapper.classList.remove('is-not-displayed');
        this.$promptPlayerFormBackground.classList.remove('is-not-displayed');
        this.$promptPlayerForm.classList.remove('is-not-displayed');

        this.visibleElements.push(this.$promptPlayerFormWrapper, this.$promptPlayerFormBackground, this.$promptPlayerForm);
    };

    MediatorView.prototype.removeErrorsFromForm = function(){
        var i;
        if (this.visibleErrors.length){
            var length = this.visibleErrors.length;
            for (i = length - 1; i >= 0; i--){
                this.handleErrorRemoval(this.visibleErrors[i]);
                this.visibleErrors.pop();
            }
        }
    };

    MediatorView.prototype.handleErrorRemoval = function(node){
        node.classList.add('is-not-displayed');
        node.innerHTML = '';
    };

    return MediatorView;
};