"use strict";

class Card {
    /**
     * @param card {ServerCard}
     * @param template {HTMLTemplateElement}
     * @param popupImage {ImagePopup}
     * @param api {Api}
     * @param user {UserInfo}
     */
    constructor(card, template, popupImage, api, user) {
        /**
         * @type {ServerCard}
         */
        this.card = card;
        /**
         *
         * @type {HTMLTemplateElement}
         */
        this.template = template;
        /**
         *
         * @type {ImagePopup}
         */
        this.popupImage = popupImage;
        /**
         *
         * @type {Api}
         */
        this.api = api;
        /**
         * @type {UserInfo}
         */
        this.user = user;
        this._like = this._like.bind(this);
        this._remove = this._remove.bind(this);
    }

    _like() {
        if (this.isLiked) {
            this.api.removeLike(this.card._id)
                .then(card => {
                    this.card = card;
                    this.updateCounter();
                    this.updateLike();
                }).catch(error => {
                console.error("Не удалось отменить лайк: ", error)
            });
        } else {
            this.api.addLike(this.card._id)
                .then(card => {
                    this.card = card;
                    this.updateCounter();
                    this.updateLike();
                }).catch(error => {
                console.error("Не удалось поставить лайк: ", error);
            });
        }
    }

    updateLike() {
        /**
         * @type {boolean}
         */
        this.isLiked = this.card.likes.some(like => {
            return like._id === this.user.id
        });
        this.likeIcon.classList.toggle('place-card__like-icon_liked', this.isLiked);
    }

    updateCounter() {
        this.counter.textContent = this.card.likes.length.toString();
    }

    _remove(event) {
        event.stopPropagation();
        this.api.deleteCard(this.card._id)
            .then(() => {
                if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
                    this.cardElement.parentElement.removeChild(this.cardElement).removeEventListener('click', this._remove);
                }
            }).catch(error => {
            console.error("Не удалось удалить карточку: ", error)
        });
    }

    create() {
        const cardTemplate = this.template.cloneNode(true);
        cardTemplate.querySelector('.place-card__name').textContent = this.card.name;
        this.cardElement = cardTemplate.querySelector('.place-card');

        this.counter = cardTemplate.querySelector('.place-card__like-counter');

        const cardRemove = cardTemplate.querySelector('.place-card__delete-icon');
        if (this.card.owner._id !== this.user.id) {
            this.cardElement.querySelector('.place-card__delete-icon').remove();
        }
        cardRemove.addEventListener('click', this._remove);

        this.likeIcon = cardTemplate.querySelector('.place-card__like-icon');
        this.likeIcon.addEventListener('click', this._like);

        const image = cardTemplate.querySelector('.place-card__image');
        image.style.backgroundImage = `url(${this.card.link})`;
        image.addEventListener('click', () => {
            this.popupImage.setImage(this.card.link);
            this.popupImage.open();
        });

        this.updateLike();
        this.updateCounter();

        return cardTemplate;
    }

}

