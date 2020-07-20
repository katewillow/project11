"use strict";

export class UserInfo {
    /**
     * @param nameElement {Element}
     * @param jobElement {Element}
     * @param avatarElement {Element}
     */
    constructor(nameElement, jobElement, avatarElement) {
        /** @type {Element} */
        this.nameElement = nameElement;
        /** @type {Element} */
        this.jobElement = jobElement;
        /** @type {Element} */
        this.avatarElement = avatarElement;
    }

    /**
     * @param name {string}
     * @param job {string}
     */
    setUserInfo(name, job) {
        /** @type {string} */
        this.name = name;
        /** @type {string} */
        this.job = job;
    }

    setId(id){
        /** @type {string} */
        this.id = id;
    }

    /**
     * Sets avatar URL
     * @param avatar {string}
     */
    setAvatar(avatar) {
        /** @type {string} */
        this.avatar = avatar;
    }

    updateUserInfo() {
        this.nameElement.textContent = this.name;
        this.jobElement.textContent = this.job;
        this.avatarElement.style.backgroundImage = `url(${this.avatar})`;
    }

}
