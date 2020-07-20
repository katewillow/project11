"use strict";

/** @typedef {{_id: string, name: string, about: string, avatar: string}} ServerUser */
/** @typedef {{_id: string, owner: ServerUser, name: string, link: string, likes: ServerUser[]}} ServerCard */

export class Api {
    constructor(options) {
        this.options = options;
        this._getResponseData = this._getResponseData.bind(this);
    }
    
    async _getResponseData(response) {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    }

    /**
     * @returns {PromiseLike<ServerUser>}
     */
    async getUserInfo() {
        const response = await fetch(`${this.options.baseUrl}/users/me`, {headers: this.options.headers});

        return this._getResponseData(response);
    }

    /**
     * @returns {PromiseLike<ServerCard[]>}
     */
    async getInitialCards() {
        const response = await fetch(`${this.options.baseUrl}/cards`, {headers: this.options.headers});

        return this._getResponseData(response);
    }

    /**
     * @param name {string}
     * @param about {string}
     * @returns {PromiseLike<ServerUser>}
     */
    editUserInfo(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about,
            })
        }).then(this._getResponseData);
    }

    /**
     * @param name {string}
     * @param link {string}
     * @returns {PromiseLike<ServerCard>}
     */
    addNewCard(name, link) {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link,
            })
        }).then(this._getResponseData);
    }

    /**
     * @param id {string}
     * @returns {PromiseLike<Response>}
     */
    deleteCard(id) {
        return fetch(`${this.options.baseUrl}/cards/${id}`, {
            headers: this.options.headers,
            method: 'DELETE'
        }).then(this._getResponseData);
    }

    /**
     * @param id {string}
     * @returns {PromiseLike<ServerCard>}
     */
    addLike(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            headers: this.options.headers,
            method: 'PUT'
        }).then(this._getResponseData);
    }

    /**
     * @param id {string}
     * @returns {PromiseLike<ServerCard>}
     */
    removeLike(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            headers: this.options.headers,
            method: 'DELETE'
        }).then(this._getResponseData);
    }

    /**
     * @param avatar {string}
     * @returns {PromiseLike<ServerUser>}
     */
    editUserPhoto(avatar) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            headers: this.options.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._getResponseData);
    }
}

