import  { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { useContext } from 'react';
import { AttendanceContext } from '../../../../context/AttendanceContext';

// eslint-disable-next-line react/prop-types
const ClockOut = () => {
  const [clockStatus, setClockStatus] = useState({
    isClockIn: false,
    lastClockIn: null,
    lastClockOut: null,
    totalHours: 15
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    const now = new Date();
    if (!clockStatus.isClockIn) {
      // Clock In
      updateAttendance(true);
      setClockStatus({
        ...clockStatus,
        isClockIn: true,
        lastClockIn: now
      });
    } else {
      // Clock Out
      const hoursWorked = (now - clockStatus.lastClockIn) / (1000 * 60 * 60);
      updateHours(hoursWorked);
      setClockStatus({
        isClockIn: false,
        lastClockIn: clockStatus.lastClockIn,
        lastClockOut: now,
        totalHours: hoursWorked
      });
    }
  };

  const { attendance, updateAttendance, updateHours } = useContext(AttendanceContext);

  // setEmployeeStats(prevStats => ({
  //   ...prevStats,
  //   hoursWorked:clockStatus.totalHours 
  // }));
  // 
     const accWorkHour=JSON.parse(localStorage.getItem('totalHoursMonth'))||0+clockStatus.totalHours;
     localStorage.setItem('totalHoursMonth', JSON.stringify(accWorkHour)); // Save to local storage

 
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Attendance Tracker</h2>
        <div className="text-4xl font-mono text-blue-400 mb-4">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      <div className="space-y-6">
        <Button
          className={`w-full py-4 ${
            clockStatus.isClockIn 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          } transition-all duration-300`}
          onClick={handleClockInOut}
        >
          {clockStatus.isClockIn ? 'Clock Out' : 'Clock In'}
        </Button>

        <div className="space-y-3 text-white">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded">
            <span>Status:</span>
            <span className={clockStatus.isClockIn ? 'text-green-400' : 'text-gray-400'}>
              {clockStatus.isClockIn ? 'Working' : 'Not Working'}
            </span>
          </div>

          {clockStatus.lastClockIn && (
            <div className="flex justify-between items-center p-3 bg-white/5 rounded">
              <span>Clock In Time:</span>
              <span className="text-blue-400">
                {clockStatus.lastClockIn.toLocaleTimeString()}
              </span>
            </div>
          )}

          {clockStatus.lastClockOut && (
            <div className="flex justify-between items-center p-3 bg-white/5 rounded">
              <span>Last Clock Out:</span>
              <span className="text-blue-400">
                {clockStatus.lastClockOut.toLocaleTimeString()}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center p-3 bg-white/5 rounded">
            <span>Total Hours Today:</span>
            <span className="text-blue-400">
              {clockStatus.totalHours.toFixed(2)} hrs
            </span>
          </div>
        </div>
      </div>
    </div>
  )

}
export default ClockOut;