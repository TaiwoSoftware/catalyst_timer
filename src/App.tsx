import { useState, useEffect, useRef } from 'react';
import './App.css'
const App = () => {
  const [inputMinutes, setInputMinutes] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetTime = () => {
    const minutes = parseInt(inputMinutes);
    if (isNaN(minutes) || minutes <= 0) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const totalSeconds = minutes * 60;
    setSecondsLeft(totalSeconds);
    setTimeUp(false);

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Countdown Timer ⏳</h1>

      <div className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-sm">
        <input
          type="number"
          className="border rounded px-4 py-2 text-lg"
          placeholder="Enter minutes"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
        />
        <button
          onClick={handleSetTime}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded transition"
        >
          Set Time
        </button>

        <div className="text-3xl text-center font-mono">
          {formatTime(secondsLeft)}
        </div>

        {timeUp && (
          <div className="text-red-600 font-bold text-xl text-center">
            TIME UP!
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
