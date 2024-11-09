// app/page.js
import MathPuzzleGame from '../components/MathPuzzleGame';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100 flex justify-center items-center">
      <MathPuzzleGame />
    </main>
  );
}