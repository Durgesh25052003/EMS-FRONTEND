import { useEffect, useState } from 'react';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return { hours, minutes, seconds, ampm };
  };

  const { hours, minutes, seconds, ampm } = formatTime(time);

  return (
    <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/90 p-6 rounded-xl shadow-2xl backdrop-blur-md border border-white/20">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <span className="text-4xl font-bold text-white font-mono">{hours}</span>
          <span className="text-4xl font-bold text-white animate-pulse">:</span>
          <span className="text-4xl font-bold text-white font-mono">{minutes}</span>
          <span className="text-4xl font-bold text-white animate-pulse">:</span>
          <span className="text-4xl font-bold text-blue-400 font-mono">{seconds}</span>
        </div>
        <span className="text-xl font-semibold text-white/80 ml-2">{ampm}</span>
      </div>
    </div>
  );
};

export default AnalogClock;