import BaseComponent from "./components/base-component.js";
import Header from "./components/header.js";
import Board from "./components/board.js";
import Card from "./components/card.js";
import Modal from "./components/modal.js";

import emojis from "./data/data.js";
import shuffle from "./utils/shuffle.js";

export default class Game {
  constructor() {
    this.moves = 0;
    this.matchedPairs = 0;
    this.totalPairs = 8;
    this.flippedCards = [];
    this.lockBoard = false;
    this.mismatchTimer = null;
    this.cards = [];

    this.header = new Header(
      () => this.startNewGame(),
      () => this.showLeaderboard(),
    );
    this.board = new Board([]);

    document.body.appendChild(this.header.getElement());
    document.body.appendChild(this.board.getElement());

    this.startNewGame();
  }

  createCards() {
    const pairs = [...emojis, ...emojis];
    const shuffled = shuffle(pairs);
    return shuffled.map(
      (emoji) => new Card(emoji, (card) => this.handleCardClick(card)),
    );
  }

  startNewGame() {
    this.clearMismatchTimer();
    this.moves = 0;
    this.matchedPairs = 0;
    this.flippedCards = [];
    this.lockBoard = false;
    this.header.updateMoves(this.moves);
    this.header.updateMatched(this.matchedPairs, this.totalPairs);
    this.cards = this.createCards();
    this.board.setCards(this.cards);
  }

  clearMismatchTimer() {
    if (this.mismatchTimer) {
      clearTimeout(this.mismatchTimer);
      this.mismatchTimer = null;
    }
    this.flippedCards.forEach((card) => {
      if (!card.isMatched) {
        card.unflip();
      }
    });
    this.flippedCards = [];
    this.lockBoard = false;
  }

  handleCardClick(card) {
    if (this.lockBoard) return;
    if (card.isFlipped || card.isMatched) return;

    card.flip();
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves += 1;
      this.header.updateMoves(this.moves);
      this.checkMatch();
    }
  }

  checkMatch() {
    const [first, second] = this.flippedCards;
    if (first.emoji === second.emoji) {
      first.match();
      second.match();
      this.matchedPairs += 1;
      this.header.updateMatched(this.matchedPairs, this.totalPairs);
      this.flippedCards = [];
      if (this.matchedPairs === this.totalPairs) {
        this.saveResult();
        this.showVictory();
      }
    } else {
      this.lockBoard = true;
      this.mismatchTimer = setTimeout(() => {
        first.unflip();
        second.unflip();
        this.flippedCards = [];
        this.lockBoard = false;
        this.mismatchTimer = null;
      }, 1000);
    }
  }

  saveResult() {
    const results = JSON.parse(
      localStorage.getItem("memoryGameResults") || "[]",
    );
    const date = new Date();
    const dateString = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
    results.push({
      moves: this.moves,
      date: dateString,
      timestamp: Date.now(),
    });
    results.sort((a, b) => {
      if (a.moves !== b.moves) return a.moves - b.moves;
      return a.timestamp - b.timestamp;
    });
    const topResults = results.slice(0, 10);
    localStorage.setItem("memoryGameResults", JSON.stringify(topResults));
  }

  showVictory() {
    const message = new BaseComponent({
      tag: "p",
      textContent: `Congratulations! You won in ${this.moves} moves.`,
    });
    const newGameButton = new BaseComponent({
      tag: "button",
      cssClasses: ["button"],
      textContent: "New Game",
    });
    const modal = new Modal("Victory!", [
      message.getElement(),
      newGameButton.getElement(),
    ]);
    newGameButton.setCallback(() => {
      modal.close();
      this.startNewGame();
    });
    modal.open();
  }

  showLeaderboard() {
    const results = JSON.parse(
      localStorage.getItem("memoryGameResults") || "[]",
    );
    const contentElements = [];
    if (results.length === 0) {
      const emptyMessage = new BaseComponent({
        tag: "p",
        cssClasses: ["leaderboard-empty"],
        textContent: "No results yet",
      });
      contentElements.push(emptyMessage.getElement());
    } else {
      const list = new BaseComponent({
        tag: "ol",
        cssClasses: ["leaderboard-list"],
      });
      results.forEach((result, index) => {
        const item = new BaseComponent({
          tag: "li",
          cssClasses: ["leaderboard-item"],
          textContent: `${index + 1}. Moves: ${result.moves} — ${result.date}`,
        });
        list.addInnerElement(item.getElement());
      });
      contentElements.push(list.getElement());
    }
    const modal = new Modal("Leaderboard", contentElements);
    modal.open();
  }
}
