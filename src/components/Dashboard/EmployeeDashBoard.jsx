import { useContext, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Progress } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import LoadingBar from "react-top-loading-bar";
import AnalogClock from './AnalogClock';
import ClockOut from '../others/Employee-others/ClockIn/ClockOut';
import {
  FaCalendarAlt,
  FaBriefcase,
  FaClock,
  FaCalendarDay,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useEvents } from '../../context/EventContext';
import { AuthContext } from '../../context/EmpContext';
import { addEmpEvent, addEvent, updateTaskStatus } from '../../service/apiService';
import authCheck from '../Auth/VerifyRole';
import { SetDateContext } from '../../context/DateContext';
import { AttendanceContext } from '../../context/AttendanceContext';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

await authCheck();


const EmployeeDashBoard = () => {
  const { attendance } = useContext(AttendanceContext);
  const [hasStarted, setHasStarted] = useState(false);
  const [Events, setEvents] = useState([])
  const navigator = useNavigate();
  const loadingBar = useRef(null);
  const [EmployeeStats, setEmployeeStats] = useState({
    attendance: attendance.attendanceRate,
    projectCompletion: 0,
    hoursWorked: Math.trunc(attendance.totalHoursMonth),
    remainingLeaves: 12
  });

  const userDataLocalStorage = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'))
  const user = userDataLocalStorage;
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (user.tasks) {
      setTasks(user.tasks)
    }
  }, [])
 console.log(tasks)
  const handleTaskStatus = async (task, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 'Completed'
    setTasks(updatedTasks);

    localStorage.setItem('userData', JSON.stringify({
      ...user,
      tasks: updatedTasks
    }))
    console.log(EmployeeStats)
    const res = await updateTaskStatus(user._id, task._id, 'Completed')
    if (res) {
      console.log('Task status updated')
    }
  }

  useEffect(() => {
    const completedTasks = tasks.filter(task => {
      return task.status === 'Completed'
    }).length
    

    const projectProgess = Math.round((completedTasks / tasks.length) * 100)
    setEmployeeStats({
      ...EmployeeStats,
      projectCompletion: projectProgess
    })
  }, [tasks])



// Move useEvents hook to component level
const { events, isLoading, error } = useEvents();
const { MonthComp } = useContext(SetDateContext)



useEffect(() => {
  if (MonthComp) {
    EmployeeStats.hoursWorked = 0;
  }
}, [MonthComp])


useEffect(() => {
  if (events) {
    console.log(events.data.events);
    setEvents(events.data.events);
    setEmployeeStats({
      ...EmployeeStats,
      remainingLeaves: user.totalLeaves - user.leaveTaken
    })
  }
}, [events]);

const startLoading = () => {
  loadingBar.current.continuousStart();
  setTimeout(() => loadingBar.current.complete(), 1500);
};

// Function to add events to the calendar
const handleEventsPush = (event, user) => {
  // Add the event to the calendar
  // You can use a library like FullCalendar.js for this
  // For now, let's just log the event to the console
  addEvent(event, user);
  addEmpEvent(user, event);
};
// Add new states for employee stats
const image=`${import.meta.env.VITE_API_URL}${user.profileImage}`
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
    <LoadingBar color="white" ref={loadingBar} />
    <nav className="px-8 py-4 bg-white/10 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-white text-xl font-semibold">EMS</span>
        </div>

        <div className="flex items-center gap-6">
          <AnalogClock />
          <Menu>
            <MenuHandler>
              <div className="flex items-center gap-4 cursor-pointer">
                <Avatar
                  src={image}
                  alt="avatar"
                  size="md"
                  className="ring-2 ring-white/50"
                  crossOrigin="anonymous"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-white">Welcome {user.firstName}</h1>
                  <span className="text-sm text-blue-200">{user.email}</span>
                </div>
              </div>
            </MenuHandler>

            <MenuList className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
              <MenuItem
                onClick={() => navigator('/employee-profile')}
                className="flex items-center gap-2 text-white hover:bg-white/10"
              >
                <FaUser className="text-blue-400" />
                <span>View Profile</span>
              </MenuItem>
              <MenuItem
                onClick={() => navigator('/settings')}
                className="flex items-center gap-2 text-white hover:bg-white/10"
              >
                <FaCog className="text-blue-400" />
                <span>Settings</span>
              </MenuItem>
              <hr className="border-white/10 my-1" />
              <MenuItem
                onClick={() => {
                  startLoading();
                  navigator('/');
                }}
                className="flex items-center gap-2 text-red-400 hover:bg-white/10"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>

    <div className="container mx-auto p-6">
      {/* Employee Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <FaCalendarAlt className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-300">Attendance Rate</p>
              <h3 className="text-2xl font-bold text-white">{EmployeeStats.attendance}%</h3>
            </div>
          </div>
          <Progress value={EmployeeStats.attendance} color="blue" className="mt-2" />
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-full">
              <FaBriefcase className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-300">Project Progress</p>
              <h3 className="text-2xl font-bold text-white">{EmployeeStats.projectCompletion}%</h3>
            </div>
          </div>
          <Progress value={EmployeeStats.projectCompletion} color="green" className="mt-2" />
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <FaClock className="text-purple-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-300">Hours This Month</p>
              <h3 className="text-2xl font-bold text-white">{EmployeeStats.hoursWorked}h</h3>
            </div>
          </div>
          <Progress value={(EmployeeStats.hoursWorked / 180) * 100} color="purple" className="mt-2" />
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <FaCalendarAlt className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-300">Leaves Remaining</p>
              <h3 className="text-2xl font-bold text-white">{EmployeeStats.remainingLeaves}</h3>
            </div>
          </div>
          <Progress value={(EmployeeStats.remainingLeaves / 15) * 100} color="orange" className="mt-2" />
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => navigator('/leave-request')}
              size="sm"
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              <FaCalendarAlt className="text-sm" />
              <span>Request</span>
            </Button>
            <Button
              onClick={() => navigator('/leave-history')}
              size="sm"
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              <FaClock className="text-sm" />
              <span>History</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Clock In/Out Component */}
        <ClockOut />  {/* Remove props since we're using context now */}
        {/* Recent Tasks */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {user && user.tasks && user.tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-green-500' : task.type === 'urgent' ? 'bg-red-500' :
                    task.type === 'upcoming' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                  <span className="text-white">{task.title}</span>
                </div>
                <span className="text-sm text-gray-300">{task.deadline}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Events */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4">
            Upcoming Events
            <span className="ml-2 px-2 py-1 bg-blue-500 rounded-full text-xs">This Week</span>
          </h2>
          <div className="space-y-3">
            {Events.map((event, index) => (
              <div
                key={index}
                className="p-4 rounded-md bg-white/5 hover:bg-white/10 transition-all border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{event.title}</span>
                  <span className="text-sm text-blue-300">{event.date.split('T')[0]}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaClock className="text-xs" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaMapMarkerAlt className="text-xs" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <button className="text-xs bg-white/10 text-blue-300 px-3 py-1 rounded hover:bg-white/20 transition-all"
                    onClick={() => {
                      handleEventsPush(event, user)
                    }}
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
              <FaCalendarDay />
              <span>View Full Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task List Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl mt-6">
        <h2 className="text-2xl font-bold text-white mb-6">Your Tasks</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <button
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${task.status === 'Completed'
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    }`}
                  onClick={() => handleTaskStatus(task, index)}
                >
                  {task.status === 'Completed' ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>

              <div className="space-y-2">
                {/* Existing task details */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Deadline:</span>
                  <span className="text-blue-300">{task.deadline}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Priority:</span>
                  <span className={`
                      ${task.priority === 'high' ? 'text-red-400' :
                      task.priority === 'medium' ? 'text-yellow-400' :
                        'text-green-400'}
                    `}>{task.priority}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Status:</span>
                  <span className={`
                      ${task.status === 'Completed' ? 'text-green-400' :
                      task.status === 'In Progress' ? 'text-blue-400' :
                        'text-yellow-400'}
                    `}>{task.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Outlet />
    {/* Add this button section right after the stats grid */}
  </div>
);
};

export default EmployeeDashBoard;
