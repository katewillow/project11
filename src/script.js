"use strict";
import './pages/index.css';
import {Api} from './js/Api';
import {Card} from './js/Card';
import {FormValidator} from './js/FormValidator';
import {UserInfo} from './js/UserInfo';
import {Popup} from './js/Popup';
import {CardList} from './js/CardList';
import {ImagePopup} from "./js/ImagePopup";
import {UserPopup} from "./js/UserPopup";

(async function () {
    const template = document.querySelector('#template').content;
    const cards = document.querySelector('.places-list');
    const nameValue = document.querySelector('.popup__input_type_name');
    const linkValue = document.querySelector('.popup__input_type_link-url');
    const openedCardButton = document.querySelector('.user-info__button');
    const popupButtonEdit = document.querySelector('.popup__button_edit');
    const popupButtonNew = document.querySelector('.popup__button_new');
    const openedEditButton = document.querySelector('.user-info__edit-button');
    const popupPicture = document.querySelector('.popup_picture');
    const popupNewCard = document.querySelector('.popup_new');
    const popupEdit = document.querySelector('.popup_edit');
    const popupAvatar = document.querySelector('.popup_avatar');
    const popupFormNew = document.querySelector('.popup__form_new');
    const popupFormEdit = document.querySelector('.popup__form_edit');
    const popupFormAvatar = document.querySelector('.popup__form_avatar');
    const userName = document.querySelector('.user-info__name');
    const userJob = document.querySelector('.user-info__job');
    const userPhoto = document.querySelector('.user-info__photo');
    const valuePerson = document.querySelector('.popup__input_type_person');
    const valueJob = document.querySelector('.popup__input_type_job');
    const valueAvatar = document.querySelector('.popup__input_type_photo');
    const popupImage = new ImagePopup(popupPicture);
    const user = new UserInfo(userName, userJob, userPhoto);
    const validationCard = new FormValidator(popupFormNew);
    const validationUser = new FormValidator(popupFormEdit);
    const validationPhoto = new FormValidator(popupFormAvatar);
    const popupCard = new Popup(popupNewCard);
    const popupUser = new Popup(popupEdit);
    const popupPhoto = new Popup(popupAvatar);
    const editUserInfo = new UserPopup(popupEdit, valuePerson, valueJob);
    const cardList = new CardList(cards);

    const serverUrl = process.env.NODE_ENV === 'development' ? 'http://nomoreparties.co' : 'https://nomoreparties.co';
    const api = new Api({
        baseUrl: serverUrl,
        headers: {
            authorization: '000169b8-90cd-4933-9d78-ff7ec047654c',
            'Content-Type': 'application/json'
        }
    });

    try {
        const [serverUser, serverCards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ]);

        user.setUserInfo(serverUser.name, serverUser.about);
        editUserInfo.setInfo(serverUser.name, serverUser.about);
        user.setId(serverUser._id);
        user.setAvatar(serverUser.avatar);
        user.updateUserInfo();
        validationUser.setSubmitButtonState(popupFormEdit);
        cardList.render(serverCards.map(card => new Card(card, template, popupImage, api, user)));
    } catch (error) {
        console.error("Не удалось загрузить данные: ", error)
    }

    popupCard.addEventListener();
    popupUser.addEventListener();
    popupImage.addEventListener();
    popupPhoto.addEventListener();

    validationCard.setEventListeners(popupFormNew);
    validationUser.setEventListeners(popupFormEdit);
    validationPhoto.setEventListeners(popupFormAvatar);

    validationCard.setSubmitButtonState(popupFormNew);
    validationPhoto.setSubmitButtonState(popupFormAvatar);

    openedCardButton.addEventListener('click', function (event) {
        popupCard.open(event);
    });

    openedEditButton.addEventListener('click', function (event) {
        popupUser.open(event);
    });

    userPhoto.addEventListener('click', function (event) {
        popupPhoto.open(event);
    });

    popupNewCard.addEventListener('submit', function (event) {
        event.preventDefault();
        popupButtonNew.textContent = 'Загрузка...';
        api.addNewCard(nameValue.value, linkValue.value).then(data => {
            cardList.addCard(new Card(data, template, popupImage, api, user));
            popupFormNew.reset();
            popupCard.close();
            validationCard.setSubmitButtonState(popupFormNew);
        }).catch(error => {
            console.error("Не удалось сохранить данные карточки: ", error)
        }).finally(() => {
            popupButtonNew.textContent = '+';
        });
    });

    popupEdit.addEventListener('submit', (event) => {
        event.preventDefault();
        popupButtonEdit.textContent = 'Загрузка...';
        api.editUserInfo(valuePerson.value, valueJob.value).then(data => {
            user.setUserInfo(data.name, data.about);
            user.updateUserInfo();
            popupUser.close();
        }).catch(error => {
            console.error("Не удалось сохранить данные пользователя: ", error)
        }).finally(() => {
            popupButtonEdit.textContent = 'Сохранить';
        });
    });

    popupAvatar.addEventListener('submit', (event) => {
        event.preventDefault();
         api.editUserPhoto(valueAvatar.value).then(data => {
            user.setAvatar(data.avatar);
            user.updateUserInfo();
            popupFormAvatar.reset();
            popupPhoto.close();
            validationPhoto.setSubmitButtonState(popupFormAvatar);
        }).catch(error => {
            console.error("Не удалось сохранить новое фото пользователя: ", error)
        });
    });

})();
