import { useState, useEffect } from 'react';
import { X, Play, Square } from 'lucide-react';

export default function Speedify() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [targetSpeed, setTargetSpeed] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    let animationFrame: number;

    const updateSpeed = () => {
      setSpeed((prevSpeed) => {
        const diff = targetSpeed - prevSpeed;
        const newSpeed = prevSpeed + diff * 0.1;
        if (Math.abs(diff) < 0.1) return targetSpeed;
        animationFrame = requestAnimationFrame(updateSpeed);
        return newSpeed;
      });
    };

    if (isRunning) {
      const interval = setInterval(() => {
        setTargetSpeed(Math.random() * 100);
      }, 2000);
      animationFrame = requestAnimationFrame(updateSpeed);
      return () => {
        clearInterval(interval);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isRunning, targetSpeed]);

  const handleStart = () => {
    setIsRunning(true);
    setSpeed(0);
    setTargetSpeed(0);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSpeed(0);
    setTargetSpeed(0);
  };

  const getSpeedColor = () => {
    if (speed < 33) return 'text-emerald-300';
    if (speed < 66) return 'text-emerald-400';
    return 'text-emerald-500';
  };

  const ringRotation = (speed / 100) * 360;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 text-teal-900 flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-teal-200">
        <div className="text-2xl font-bold text-teal-700">SPEEDIFY</div>
        <button
          className="text-teal-600 hover:text-teal-800 transition-colors"
          onClick={() => setShowAbout(true)}
        >
          About
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="relative w-80 h-80 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-teal-300"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
              r="49"
              cx="50"
              cy="50"
              style={{ transform: `rotate(${ringRotation}deg)`, transformOrigin: 'center' }}
            />
            <circle
              className="text-teal-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className={`${getSpeedColor()} transition-all duration-300`}
              strokeWidth="10"
              strokeDasharray={283}
              strokeDashoffset={283 - (speed / 100) * 283}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            {isRunning ? (
              <div className="text-5xl font-bold text-teal-700">{speed.toFixed(1)}</div>
            ) : (
              <button
                className="text-5xl font-bold text-teal-700 hover:text-teal-900 transition-colors"
                onClick={handleStart}
              >
                <Play size={64} />
              </button>
            )}
            {isRunning && (
              <div className="text-teal-600 mt-2 text-xl">Mbps</div>
            )}
          </div>
        </div>

        <div className="text-center text-teal-600 mb-8">
          <div className="text-2xl font-semibold mb-2">
            {isRunning ? 'Testing...' : 'Click Play to start'}
          </div>
          <div className="text-lg">
            {isRunning ? 'Measuring your internet speed' : 'Ready to test your connection'}
          </div>
        </div>

        {isRunning && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center"
            onClick={handleStop}
          >
            <Square size={24} className="mr-2" />
            Stop Test
          </button>
        )}
      </main>

      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl relative max-w-md w-full">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg p-4">
              <h2 className="text-2xl font-bold text-white">About Speedify</h2>
            </div>
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
              onClick={() => setShowAbout(false)}
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <p className="text-teal-700 text-lg mb-4">
                Speedify is a modern internet speed testing tool designed for simplicity and accuracy.
              </p>
              <p className="text-teal-600">© 2024 Yaj Kotak</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
