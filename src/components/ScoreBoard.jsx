import React from 'react';

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="text-center mt-4">
      <p className="text-xl font-bold text-yellow-400">Score: {score}</p>
      <p className="text-sm text-gray-400">High Score: {highScore}</p>
    </div>
  );
};

export default ScoreBoard;
