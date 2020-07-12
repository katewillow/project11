"use strict";

class FormValidator {
    /**
     * @param form {Element}
     */
    constructor(form) {
        /**
         * @type {Element}
         */
        this.form = form;
    }

    /**
     * @param input {HTMLInputElement}
     * @private
     */
    _checkInputValidity(input) {
        /**
         * @type {Element}
         */
        const error = input.nextElementSibling;

        input.checkValidity();

        if (input.validity.valueMissing) {
            input.setCustomValidity(errorMessages.empty);
        } else if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(errorMessages.wrongLength);
        } else if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(errorMessages.wrongUrl);
        } else {
            input.setCustomValidity("");
        }

        error.innerText = input.validationMessage;
    }

    setSubmitButtonState() {
        /**
         * @type {Element}
         */
        const submitButton = this.form.querySelector('.popup__button');
        submitButton.disabled = !this.form.checkValidity();
        submitButton.classList.toggle('popup__button_valid', this.form.checkValidity());
    }

    _checkFormValidity() {
        Array.from(this.form.elements).filter(element => element.type !== 'submit').forEach(this._checkInputValidity);
        this.setSubmitButtonState(this.form);
    }

    setEventListeners() {
        this.form.addEventListener('input', () => this._checkFormValidity(this.form));
    }
}
