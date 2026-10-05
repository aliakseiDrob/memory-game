import BaseComponent from "./base-component.js";

export default class Card extends BaseComponent {
  constructor(emoji, onClick) {
    super({
      tag: "div",
      cssClasses: ["card"],
      attributes: { "data-emoji": emoji },
    });
    this.emoji = emoji;
    this.isFlipped = false;
    this.isMatched = false;
    this.front = new BaseComponent({
      tag: "div",
      cssClasses: ["card-face", "card-front"],
      textContent: "?",
    });
    this.back = new BaseComponent({
      tag: "div",
      cssClasses: ["card-face", "card-back"],
      textContent: emoji,
    });
    this.addInnerElement(this.front.getElement());
    this.addInnerElement(this.back.getElement());
    this.setCallback(() => onClick(this));
  }

  flip() {
    this.isFlipped = true;
    this.element.classList.add("flipped");
  }

  unflip() {
    this.isFlipped = false;
    this.element.classList.remove("flipped");
  }

  match() {
    this.isMatched = true;
    this.element.classList.add("matched");
  }

  reset() {
    this.isFlipped = false;
    this.isMatched = false;
    this.element.classList.remove("flipped", "matched");
  }
}
