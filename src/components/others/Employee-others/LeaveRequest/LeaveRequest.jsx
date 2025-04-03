import { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { createLeave, getEmpLeave } from '../../../../service/apiService';

const LeaveRequest = () => {
    const [leaveRequest, setLeaveRequest] = useState({
        leaveType: '',
        startDate: '',
        endDate: '',
        duration: '',
        reason: '',
        status: 'Pending',
        appliedOn: new Date().toISOString().split('T')[0]
    });
    const [leaveHistory, setLeaveHistory] = useState([ // Add more leave history items here
    ]);
    // Calculate duration when dates change
    const calculateDuration = (start, end) => {
        if (!start || !end) return '';
        const diffTime = Math.abs(new Date(end) - new Date(start));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
    };

    const handleDateChange = (field, value) => {
        setLeaveRequest(prev => {
            const newRequest = { ...prev, [field]: value };
            if (newRequest.startDate && newRequest.endDate) {
                newRequest.duration = calculateDuration(newRequest.startDate, newRequest.endDate);
            }
            return newRequest;
        });
    };

    //Will Give the LEAVE HISTORY
    const user=JSON.parse(localStorage.getItem('userData'))
    console.log(user)
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const leaves = await getEmpLeave(user._id);
                console.log(leaves.data.leaves)
                setLeaveHistory(leaves.data.leaves)
            } catch (error) {
                console.error("Error fetching leaves:", error);
            }
        };
        
        fetchLeaves();
    }, [user._id]);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(leaveRequest)
        // API CAll
        createLeave(leaveRequest)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-6">
            <div className="container mx-auto">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-400" />
                        Leave Request Form
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={leaveRequest.startDate}
                                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">End Date</label>
                                <input
                                    type="date"
                                    value={leaveRequest.endDate}
                                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-blue-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Leave Type</label>
                            <select
                                value={leaveRequest.leaveType}
                                onChange={(e) => setLeaveRequest({ ...leaveRequest, leaveType: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-blue-400"
                                required
                            >
                                <option value="" disabled className='text-black'>Select Leave Type</option>
                                <option value="vacation" className='text-black'>Vacation</option>
                                <option value="sick" className='text-black'>Sick Leave</option>
                                <option value="personal" className='text-black'>Personal Leave</option>
                                <option value="emergency" className='text-black'>Emergency Leave</option>
                                <option value="others" className='text-black'>Others </option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Duration</label>
                            <input
                                type="text"
                                value={leaveRequest.duration}
                                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-blue-400"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Reason</label>
                            <textarea
                                value={leaveRequest.reason}
                                onChange={(e) => setLeaveRequest({ ...leaveRequest, reason: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-blue-400"
                                rows="4"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-md">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-300">Applied On:</span>
                                <span className="text-white">{leaveRequest.appliedOn}</span>
                            </div>
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                            >
                                Submit Request
                            </Button>
                        </div>
                    </form>

                    {/* Recent Leave Requests */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Requests</h3>
                        <div className="space-y-4">
                            {leaveHistory.map((request, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${request.status === 'Approved' ? 'bg-green-400' :
                                                request.status === 'Pending' ? 'bg-yellow-400' :
                                                    'bg-red-400'
                                            }`} />
                                        <span className="text-white">{request.startDate.split('T')[0]}</span>
                                        <span className="text-gray-300">{request.leaveType}</span>
                                    </div>
                                    <span className={`
                    ${request.status === 'Approved' ? 'text-green-400' :
                                            request.status === 'Pending' ? 'text-yellow-400' :
                                                'text-red-400'}
                  `}>{request.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveRequest;