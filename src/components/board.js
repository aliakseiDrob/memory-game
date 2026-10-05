import BaseComponent from "./base-component.js";

export default class Board extends BaseComponent {
  constructor(cards) {
    super({ tag: "div", cssClasses: ["board-container"] });
    this.grid = new BaseComponent({ tag: "div", cssClasses: ["board"] });
    this.addInnerElement(this.grid.getElement());
    this.cards = [];
    this.setCards(cards);
  }

  setCards(cards) {
    this.cards.forEach((card) => card.getElement().remove());
    this.cards = cards;
    cards.forEach((card) => this.grid.addInnerElement(card.getElement()));
  }
}