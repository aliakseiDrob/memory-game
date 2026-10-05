# Memory Game

A browser-based memory card matching game developed as part of the [Memory Game](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game) task. The goal is to find all 8 matching pairs of cards using as few moves as possible.

## Deploy Link

[Live Demo](https://aliakseidrob.github.io/memory-game/)

## Key Features

- **Dynamic DOM generation** — the entire user interface is built entirely from JavaScript without using `innerHTML`, `outerHTML`, `document.write`, or similar methods.
- **Component-based architecture** — all UI components (`Header`, `Board`, `Card`, `Modal`) extend the reusable `BaseComponent` helper class.
- **3D card flipping animations** — smooth `rotateY` flip effects powered by CSS3 `perspective`, `transform-style: preserve-3d`, and `backface-visibility`.
- **Core game loop** — 16 cards (8 pairs) are shuffled on every new game using the Fisher-Yates algorithm.
- **Move and match counters** — tracks the number of moves and matched pairs in real time.
- **Mismatch handling** — non-matching cards flip back automatically after exactly 1000 ms, and the board is locked during this time.
- **Instant restart** — the **New Game** button clears any pending timers and resets the board immediately.
- **LocalStorage-based Leaderboard** — the best 10 results (sorted by moves, earliest first on ties) are saved and displayed with the game date.
- **Universal reusable modals** — both the victory screen and leaderboard use a shared modal component that closes via button, overlay click, or the `Escape` key.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+ Modules)
- LocalStorage API

## How to Install and Run

1. Clone the repository:

```bash
git clone https://github.com/username/memory-game.git
cd memory-game
```

2. To run the project locally, you can use any native JavaScript static file server (e.g., `serve` via Node.js) or open the `index.html` file directly in your browser.

To serve using Node.js:

```bash
npx serve .
```

3. Open `http://localhost:3000` (or the port provided by your static server) in your browser.

## Application Architecture

- `index.html` is the application entry point. It loads `style.css` and `src/script.js` as an ES module.
- `src/script.js` bootstraps the game, manages game state, and renders the UI.
- `src/components/base-component.js` provides the `BaseComponent` base class that wraps `document.createElement` and offers helper methods for classes, attributes, text content, click callbacks, and child elements.
- All game components (`Header`, `Board`, `Card`, `Modal`) inherit from `BaseComponent`, keeping the codebase modular and free of inline HTML.
