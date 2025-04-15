import React, { useState, useEffect } from 'react';
import SnakeBoard from './components/SnakeBoard';
import ScoreBoard from './components/ScoreBoard';
import VoiceIndicator from './components/VoiceIndicator';
import GameOverModal from './components/GameOverModal';
import useVoiceControl from './hooks/useVoiceControl';
import {
  getNextHead,
  updateGrid,
  createInitialState,
  getRandomFood,
  checkCollision
} from './utils/gameLogic';

function App() {
  const [gameState, setGameState] = useState(createInitialState());
  const [grid, setGrid] = useState(updateGrid(gameState.snake, gameState.food, []));
  const [currentDirection, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  const { listening, toggleListening } = useVoiceControl(setDirection);

  // TTS: Intro
  useEffect(() => {
    const welcome = new SpeechSynthesisUtterance("Let's play Snake with voice control!");
    welcome.rate = 1;
    speechSynthesis.speak(welcome);
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const newHead = getNextHead(prev.snake[0], currentDirection);

        // Collision check
        if (checkCollision(newHead, prev.snake)) {
          speechSynthesis.speak(new SpeechSynthesisUtterance("Game Over"));
          localStorage.setItem('highScore', Math.max(prev.score, prev.highScore));
          setGameOver(true);
          return prev;
        }

        // Move
        let newSnake = [newHead, ...prev.snake];
        let newTrail = [...prev.trail, prev.snake[prev.snake.length - 1]];
        let newFood = prev.food;
        let newScore = prev.score;

        // Eat food
        if (newHead === prev.food) {
          newFood = getRandomFood(20, newSnake);
          newScore += 10;
          speechSynthesis.speak(new SpeechSynthesisUtterance("Yummy"));
        } else {
          newSnake.pop();
          newTrail = newTrail.slice(-5); // keep trail short
        }

        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          trail: newTrail,
          score: newScore,
          highScore: Math.max(newScore, prev.highScore)
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [currentDirection, gameOver]);

  // Update grid when game state changes
  useEffect(() => {
    setGrid(updateGrid(gameState.snake, gameState.food, gameState.trail));
  }, [gameState]);

  // Restart
  const handleRestart = () => {
    const newState = createInitialState();
    setGameState(newState);
    setGrid(updateGrid(newState.snake, newState.food, []));
    setDirection('RIGHT');
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4 relative">
      <h1 className="text-3xl font-extrabold mb-2 text-green-400 tracking-wider">
        🎮 Voice Snake
      </h1>
      <p className="mb-4 text-sm text-gray-400">
        Say: "up", "down", "left", "right"
      </p>

      <SnakeBoard grid={grid} />
      <ScoreBoard score={gameState.score} highScore={gameState.highScore} />
      <VoiceIndicator listening={listening} toggleListening={toggleListening} />

      {gameOver && (
        <GameOverModal
          onRestart={handleRestart}
          score={gameState.score}
          highScore={gameState.highScore}
        />
      )}
    </div>
  );
}

export default App;
