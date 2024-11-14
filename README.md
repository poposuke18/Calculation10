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

## 🚀 Game Features

- Interactive start screen with game rules
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

## 🎯 Game Rules

- Must use all numbers exactly once
- Cannot use the same number multiple times
- Cannot divide by zero
- Cannot add unnecessary zeros before numbers (e.g., 01 is invalid)

## 🛠️ Technology Stack

- Next.js 13
- React
- Tailwind CSS
- Framer Motion

## 🔈 Sound Effects

The game includes the following sound effects:
- `click.mp3`: Playing when clicking numbers/operators
- `correct.mp3`: Playing when the answer is correct
- `fault.mp3`: Playing when the answer is wrong
- `skip.mp3`: Playing when skipping
- `clear.mp3`: Playing when clearing input

## 🔧 Project Structure

```
your-project/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Button.js
│   ├── Card.js
│   ├── ConfirmButton.js
│   ├── MathPuzzleGame.js
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