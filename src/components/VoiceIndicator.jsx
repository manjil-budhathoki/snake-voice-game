import React from 'react';

const VoiceIndicator = ({ listening, toggleListening }) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div
        className={`w-4 h-4 rounded-full ${
          listening ? 'bg-green-400 animate-pulse' : 'bg-red-500'
        }`}
      ></div>
      <p className="text-sm text-white">{listening ? 'Listening...' : 'Not Listening'}</p>
      <button
        onClick={toggleListening}
        className="ml-4 px-3 py-1 bg-purple-700 hover:bg-purple-800 rounded-full text-white text-xs transition"
      >
        {listening ? 'Stop Voice' : 'Start Voice'}
      </button>
    </div>
  );
};

export default VoiceIndicator;
