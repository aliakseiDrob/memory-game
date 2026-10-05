import BaseComponent from "./base-component.js";

export default class Header extends BaseComponent {
  constructor(onNewGame, onShowLeaderboard) {
    super({ tag: "header", cssClasses: ["header"] });
    this.title = new BaseComponent({
      tag: "h1",
      cssClasses: ["title"],
      textContent: "Memory Game",
    });
    this.stats = new BaseComponent({ tag: "div", cssClasses: ["stats"] });
    this.movesElement = new BaseComponent({
      tag: "span",
      cssClasses: ["stat"],
      textContent: "Moves: 0",
    });
    this.matchedElement = new BaseComponent({
      tag: "span",
      cssClasses: ["stat"],
      textContent: "Matched: 0/8",
    });
    this.stats.addInnerElement(this.movesElement.getElement());
    this.stats.addInnerElement(this.matchedElement.getElement());
    this.buttons = new BaseComponent({
      tag: "div",
      cssClasses: ["header-buttons"],
    });
    this.newGameButton = new BaseComponent({
      tag: "button",
      cssClasses: ["button"],
      textContent: "New Game",
    });
    this.leaderboardButton = new BaseComponent({
      tag: "button",
      cssClasses: ["button"],
      textContent: "Leaderboard",
    });
    this.newGameButton.setCallback(onNewGame);
    this.leaderboardButton.setCallback(onShowLeaderboard);
    this.buttons.addInnerElement(this.newGameButton.getElement());
    this.buttons.addInnerElement(this.leaderboardButton.getElement());
    this.addInnerElement(this.title.getElement());
    this.addInnerElement(this.stats.getElement());
    this.addInnerElement(this.buttons.getElement());
  }

  updateMoves(moves) {
    this.movesElement.setTextContent(`Moves: ${moves}`);
  }

  updateMatched(matched, total) {
    this.matchedElement.setTextContent(`Matched: ${matched}/${total}`);
  }
}
