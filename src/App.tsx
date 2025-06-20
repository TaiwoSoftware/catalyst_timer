import { useState, useEffect, useRef } from 'react';
import './App.css'
import logo from './assets/catalystlogo.jpg';
const App = () => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);

  const handleStart = () => {
    if (totalSeconds <= 0) return;

    setCountdown(totalSeconds);
    setIsRunning(true);
    setTimeUp(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeUp(false);
    setMinutes('');
    setSeconds('');
    setCountdown(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning && countdown !== null) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
    <img src={logo} className='rounded-lg' alt="catalyst" />
    <div className="bg-black text-white  flex items-center justify-center">
      {!isRunning && !timeUp && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <h1 className="text-6xl font-bold text-center mb-4"> TIMER</h1>
          <div className="flex justify-center gap-4">
            <input
              type="number"
              placeholder="00"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="px-4 py-2 text-4xl rounded outline-none border-none bg-transparent placeholder:text-white placeholder:text-4xl text-white w-28 text-center"
            />
            <p className="text-4xl mt-2">:</p>
            <input
              type="number"
              placeholder="00"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="px-4 py-2 text-4xl rounded outline-none border-none  bg-transparent placeholder:text-white placeholder:text-4xl text-white w-28 text-center"
            />
          </div>
          <button
            onClick={handleStart}
            className="bg-white text-black px-6 py-2 mt-4 rounded hover:bg-gray-200 transition-all text-lg font-semibold"
          >
            Start Timer
          </button>
        </div>
      )}

      {isRunning && countdown !== null && (
        <div
          className={` timer font-extrabold animate-pulse ${
            countdown <= 10 ? 'text-red-600' : 'text-white'
          }`}
        >
          {formatTime(countdown)}
        </div>
      )}

      {timeUp && (
        <div className="text-center animate-fade-in-up">
          <h1 className="text-red-600 timeup text-6xl font-extrabold mb-6">Time Up!</h1>
          <button
            onClick={handleReset}
            className="bg-white text-black px-6 py-2  hover:bg-gray-200 set-time-btn transition-all text-lg font-semibold"
          >
            Set Time
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default App;

