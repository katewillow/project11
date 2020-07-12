"use strict";

class ImagePopup extends Popup {
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