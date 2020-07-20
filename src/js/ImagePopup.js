"use strict";
import {Popup} from './Popup';
export class ImagePopup extends Popup {
    /**
     * @param popup {Element}
     */
    constructor(popup) {
        super(popup);
    }

    /**
     * @param imageUrl {string}
     */
    setImage(imageUrl) {
        const popupImage = this.popup.querySelector('.popup__image');
        popupImage.src = imageUrl;
    }
}