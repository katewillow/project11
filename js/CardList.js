"use strict";

class CardList {
    /**
     * @param cards {Element}
     */
    constructor(cards) {
        /**
         * @type {Element}
         */
        this.cards = cards;
    }

    /**
     * @param card {Card}
     */
    addCard(card) {
        this.cards.appendChild(card.create());
    }

    /**
     * @param array {Card[]}
     */
    render(array) {
        array.forEach(card => {
            this.addCard(card);
        });
    }
}



