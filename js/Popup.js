"use strict";

class Popup {
    /**
     * @param popup {Element}
     */
    constructor(popup) {
        /** @type {Element} */
        this.popup = popup;
        this.onKeyup = this.onKeyup.bind(this);
    }

    open() {
        this.popup.classList.add('popup_is-opened');
        document.addEventListener('keyup', this.onKeyup);
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this.onKeyup);
    }

    addEventListener() {
        this.popup.addEventListener('click', /** @type {Event} */ event => {

            const target = /** @type {Element} */ event.target;

            if (target.classList.contains('popup__close')) {
                this.close();
            }
        });

    }

    /**
     *
     * @param event {KeyboardEvent}
     */
    onKeyup(event) {
        if (event.code === 'Escape') {
            this.close();
        }
    }
}