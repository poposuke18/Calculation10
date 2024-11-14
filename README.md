# Calculation 10! (Make 10 Puzzle)

## 🎮 Game Overview

A mathematical puzzle game where you create 10 using four numbers and basic arithmetic operations.
Challenge yourself to solve as many puzzles as possible within the time limit!

## 🕹️ How to Play

1. Start with a 90-second time limit
2. Use all four given numbers to make 10
3. Available operators: `+`, `-`, `×`, `÷` and brackets `()`
4. When you solve correctly:
   - Score +1 point
   - Time +10 seconds
5. When you skip:
   - New numbers appear
   - Time -5 seconds
6. Game over when time reaches 0

## 🎮 Game Features

- Interactive start screen with game rules
- High score system
  - Record your score with 3-letter initials
  - View top 10 high scores
  - Persistent storage using Vercel KV
- Sound effects for actions
  - Number/operator selection
  - Correct answer
  - Wrong answer
  - Skip
  - Clear
- Sound toggle button
- Confirmation dialog for restart
- Animated UI elements
- Real-time score tracking
- Dynamic time management

## 🏆 High Score System

The game includes a high score system that:
- Allows players to submit their scores with 3-letter initials
- Displays the top 10 scores of all time
- Automatically updates when new high scores are achieved
- Persists scores across sessions using Vercel KV storage

[Previous content remains the same...]

## 🔧 Project Structure

```
your-project/
├── app/
│   ├── api/
│   │   └── scores/
│   │       └── route.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Button.js
│   ├── Card.js
│   ├── ConfirmButton.js
│   ├── HighScores.js
│   ├── MathPuzzleGame.js
│   ├── ScoreInput.js
│   └── StartScreen.js
├── contexts/
│   └── SoundContext.js
├── lib/
│   └── mathUtils.js
└── public/
    └── sounds/
        ├── click.mp3
        ├── correct.mp3
        ├── fault.mp3
        ├── skip.mp3
        └── clear.mp3
```

## 🛠️ Environment Setup

1. Create a Vercel KV database instance
2. Set up the following environment variables:
   ```
   KV_URL=
   KV_REST_API_URL=
   KV_REST_API_TOKEN=
   ```

## 🌐 Deployment

This game is hosted on [Vercel](https://calculation10.vercel.app)

## 🧑‍💻 Development Guide

### Local Setup

```bash
# Clone the repository
git clone https://github.com/poposuke18/Calculation10.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

1. Create a `/public/sounds` directory
2. Add the following sound files:
   - click.mp3
   - correct.mp3
   - fault.mp3
   - skip.mp3
   - clear.mp3

### Contributing

Bug reports and feature improvement suggestions are welcome through GitHub Issues and Pull Requests.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).