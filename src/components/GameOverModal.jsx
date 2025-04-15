import React from 'react';

const GameOverModal = ({ onRestart, score, highScore }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl text-center shadow-xl animate-bounce w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-2">💀 Game Over</h2>
        <p className="text-lg mb-2">Your Score: <strong>{score}</strong></p>
        <p className="text-lg mb-6">High Score: <strong>{highScore}</strong></p>
        <button
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-all"
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
