import { useEffect, useRef, useState } from 'react';

const useVoiceControl = (setDirection) => {
  const [listening, setListening] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognitionRef.current = recognition;

    let lastCommand = '';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (transcript !== lastCommand) {
        lastCommand = transcript;
        if (transcript.includes("up")) setDirection("UP");
        else if (transcript.includes("down")) setDirection("DOWN");
        else if (transcript.includes("left")) setDirection("LEFT");
        else if (transcript.includes("right")) setDirection("RIGHT");
      }
    };

    recognition.onend = () => {
      if (listening) recognition.start();
    };

    if (listening) recognition.start();

    return () => recognition.stop();
  }, [listening, setDirection]);

  const toggleListening = () => {
    setListening(prev => {
      const newState = !prev;
      if (newState) {
        recognitionRef.current?.start();
      } else {
        recognitionRef.current?.stop();
      }
      return newState;
    });
  };

  return { listening, toggleListening };
};

export default useVoiceControl;
