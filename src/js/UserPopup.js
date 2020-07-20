"use strict";
import {Popup} from './Popup';
export class UserPopup extends Popup {
    /**
     * @param popup {Element}
     * @param person {Element}
     * @param job {Element}
     */
    constructor(popup, person, job) {
        super(popup);
        /** @type {Element} */
        this.person = person;
        /** @type {Element} */
        this.job = job;
    }

    /**
     * @param name {string}
     * @param about {string}
     */
    setInfo(name, about) {
        this.person.value = name;
        this.job.value = about;
    }
}