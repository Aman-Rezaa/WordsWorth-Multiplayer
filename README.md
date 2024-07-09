# WORDSWORTH Multiplayer Game

A word game built using HTML, CSS, Bootstrap JavaScript, Node.js, Express.js and Spline with multiplayer feature that allows users to challenge friends by sharing unique game links. The game also includes various difficulty modes, sound effects, and leaderboards for each instance of a game.

## Features

- *Multiplayer Mode:* Challenge friends by sharing a unique game link.
- *Difficulty Levels:* Choose from Easy, Medium, Hard, and Insane modes.
- *Leaderboard:* Track and display the top players.
- *Sound Effects:* Background music and sound effects for different game modes.
- *Responsive Design:* Optimized for desktop only.

## Installation

1. *Clone the repository:*

    ```bash
    git clone https://github.com/Aman-Rezaa/WordsWorth-Multiplayer.git
    cd WordsWorth-Multiplayer
    ```
    

2. *Install dependencies:*

    ```bash
    npm install
    ```
    

3. *Set up environment variables: (optional)*

    Create a .env file in the root directory and add the following variables:

    ```bash
    PORT=3000
    ```
    
    

4. *Start the server:*

    ```bash
    npm start
    ```
    

5. *Open the application in your browser:*

    ```bash
    Navigate to http://localhost:3000.
    111

## Usage

### Game Modes

- *Easy Mode:* 5 minutes timer
- *Medium Mode:* 2 minutes timer
- *Hard Mode:* 1 minute timer
- *Insane Mode:* 30 seconds timer

### Multiplayer

1. *Create a game:*

   - Go to the main menu and select a difficulty level.
   - Share the generated link with a friend to start the game.

2. *Join a game:*

   - Open the link shared by your friend.
   - The game will start automatically.

### Leaderboard

- The leaderboard displays the top players with their scores.
- If the leaderboard is empty, a relevant message is shown.

### Sound Control

- Toggle sound on or off using the button provided in the game interface.

## Folder Structure

```plaintext
wordle-multiplayer/
├── public/
│   ├── css/
|   |     |──  1v1_link_gen.css
|   |     |──  about-us.css
|   |     |──  front-page.css
|   |     |──  game-menu.css
|   |     |──  leaderboard.css
|   |     |──  rules.css
|   |     |──  time-rush.css
|   |     |──  wordle-dup.css
|   |     |──  wordle.css
│   ├── js/
|   |     |── 1v1_link_gen.js
|   |     |── expired.js
|   |     |── front-page.js
|   |     |── main-menu.js
|   |     |── time-rush.js
|   |     |── wordle-dup.js
|   |     |── wordle.js
│   ├── resources/(contains all images and sounds used in the project)
│   ├── front-page.html
│   ├── main-menu.html
│   ├── index.html
|   ├── one-v-one.html
│   ├── left-one-v-one.html
│   ├── time-rush.html
|   |── time-rush-game.html
|   ├── leaderboard.html
│   ├── rules.html
|   |── about-us.html
│   └── expired.html
├── utils/
│   └── encryption.js
├── index.js------------------------------------------>SERVER FILE
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
