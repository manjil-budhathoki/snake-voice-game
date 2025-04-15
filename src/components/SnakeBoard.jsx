import React from 'react';

const SnakeBoard = ({ grid }) => {
  const emojis = ['✨', '🌟', '🔥', '💫'];

  return (
    <div className="grid grid-cols-20 grid-rows-20 gap-[1px] bg-[#111] w-[90vw] max-w-[400px] aspect-square">
      {grid.map((cell, i) => (
        <div key={i} className="w-full h-full text-center flex items-center justify-center text-sm">
          {cell === 'snake' ? (
            <div className="bg-green-500 w-full h-full"></div>
          ) : cell === 'food' ? (
            <div className="bg-red-500 w-full h-full"></div>
          ) : cell === 'trail' ? (
            <span className="text-yellow-400">{emojis[Math.floor(Math.random() * emojis.length)]}</span>
          ) : (
            <div className="bg-[#1a1a1a] w-full h-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SnakeBoard;
