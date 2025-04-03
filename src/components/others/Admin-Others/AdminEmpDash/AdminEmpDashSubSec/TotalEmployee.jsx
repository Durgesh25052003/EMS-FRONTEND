import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../context/EmpContext';
import { addTask } from '../../../../../service/apiService';

const EmployeeCard = () => {
  // Sample employee data - replace with your actual data source
  const { data } = useContext(AuthContext);
  console.log(data,"🌟🌟🌟")
  const [Employee, setEmployee] = useState([]);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (data) {
      setEmployee(data.data.data.employee);
    }
  }, [data]);

  
  const handleAddTask = (employee) => {
    setSelectedEmployee(employee);
    setShowTaskPopup(true);
  };

  const handleTaskSubmit = (taskDetails) => {
    console.log('Task assigned to:', selectedEmployee.firstName, taskDetails);
    addTask(selectedEmployee._id,taskDetails);
    // Add your task submission logic here
    setShowTaskPopup(false);
  };

  return (
    <div>
    <ul>
      {
        Employee.map((employee,index) => {
          return (
            <li key={index}>
              <div className="max-w-4xl rounded-xl overflow-hidden shadow-lg my-5" style={{
                background: "linear-gradient(to right, #1e40af, #60a5fa, #ffffff)"
              }}>
                {/* Horizontal card layout with custom gradient background */}
                <div className="flex flex-row">
                  {/* Profile Picture Section - Left side */}
                  <div className="p-6 flex-shrink-0 flex flex-col items-center justify-center" style={{
                    background: "rgba(37, 99, 235, 0.3)"
                  }}>
                    <img
                      src={`${import.meta.env.VITE_API_URL}${employee.profileImage}`}
                      alt={`${employee.name}'s profile`}
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                      crossOrigin="anonymous"
                    />
                    <div className="mt-4 text-center text-white">
                      <h2 className="text-xl font-bold">{employee.firstName}</h2>
                      <p className="text-blue-50">{employee.position}</p>
                    </div>
                  </div>

                  {/* Card Body - Information on right side */}
                  <div className="flex-grow p-6" style={{
                    background: "rgba(255, 255, 255, 0.85)"
                  }}>
                    <h3 className="text-blue-700 text-lg font-medium mb-4 border-b border-blue-200 pb-2">Employee Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div className="flex flex-col">
                        <label className="text-blue-600 font-medium mb-1">Department</label>
                        <span>{employee.department}</span>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-blue-600 font-medium mb-1">Email</label>
                        <span>{employee.email}</span>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-blue-600 font-medium mb-1">Phone</label>
                        <span>{employee.phone}</span>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-blue-600 font-medium mb-1">Join Date</label>
                        <span>{employee.joiningDate}</span>
                      </div>

                      <div className="md:col-span-2 mt-4 flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100"
                        onClick={()=>handleAddTask(employee)}>
                          Add Task
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>)
        })
      }
    </ul>

    {showTaskPopup && (
        <TaskPopup
          employee={selectedEmployee}
          onClose={() => setShowTaskPopup(false)}
          onSubmit={handleTaskSubmit}
        />
      )}

    
</div>
  );
};


const TaskPopup = ({ employee, onClose, onSubmit }) => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    type: 'normal' // Add type field with default value
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskDetails);
    setTaskDetails({ title: '', description: '', deadline: '', priority: 'medium', type: 'normal' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Assign Task to {employee?.firstName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={taskDetails.title}
              onChange={(e) => setTaskDetails({...taskDetails, title: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={taskDetails.description}
              onChange={(e) => setTaskDetails({...taskDetails, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={taskDetails.type}
              onChange={(e) => setTaskDetails({...taskDetails, type: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={taskDetails.priority}
              onChange={(e) => setTaskDetails({...taskDetails, priority: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={taskDetails.deadline}
              onChange={(e) => setTaskDetails({...taskDetails, deadline: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EmployeeCard;