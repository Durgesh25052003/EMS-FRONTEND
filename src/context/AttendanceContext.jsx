import { createContext, useContext, useState, useEffect } from "react";
import { SetDateContext } from "./DateContext";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const dateContext = useContext(SetDateContext);
  const MonthComp = dateContext?.MonthComp || false;
  const [attendance, setAttendance] = useState({
    daysPresent: parseInt(localStorage.getItem('daysPresent')) || 0,
    totalHoursMonth: parseFloat(localStorage.getItem('totalHoursMonth')) || 0,
    attendanceRate: 0
  });

  const calculateAttendanceRate = () => {
    const currentDate = new Date();
    const workingDays = getWorkingDaysInMonth(currentDate);
    const rate = Math.round((attendance.daysPresent / workingDays) * 100);
    return rate > 100 ? 100 : rate;
  };

  const getWorkingDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    let workingDays = 0;

    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDays++;
      }
    }
    return workingDays;
  };

  useEffect(() => {
    if (dateContext && MonthComp) {
      setAttendance({
        daysPresent: 0,
        totalHoursMonth: 0,
        attendanceRate: 0
      });
      localStorage.setItem('daysPresent', '0');
      localStorage.setItem('totalHoursMonth', '0');
    }
  }, [MonthComp, dateContext]);

  useEffect(() => {
    const rate = calculateAttendanceRate();
    setAttendance(prev => ({
      ...prev,
      attendanceRate: rate
    }));
  }, [attendance.daysPresent]);

  const updateAttendance = (isClockIn) => {
    if (isClockIn) {
      const newDaysPresent = attendance.daysPresent + 1;
      setAttendance(prev => ({
        ...prev,
        daysPresent: newDaysPresent
      }));
      localStorage.setItem('daysPresent', newDaysPresent.toString());
    }
  };

  const updateHours = (hours) => {
    const newTotalHours = attendance.totalHoursMonth + hours;
    setAttendance(prev => ({
      ...prev,
      totalHoursMonth: newTotalHours
    }));
    localStorage.setItem('totalHoursMonth', newTotalHours.toString());
  };

  return (
    <AttendanceContext.Provider value={{ 
      attendance, 
      updateAttendance, 
      updateHours 
    }}>
      {children}
    </AttendanceContext.Provider>
  );
};