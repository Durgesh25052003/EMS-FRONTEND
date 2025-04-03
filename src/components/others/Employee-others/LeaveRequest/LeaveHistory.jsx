import { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { useLeaveContext } from '../../../../context/leaveContext';
import { deleteLeave, getEmpLeave } from '../../../../service/apiService';

const LeaveHistory = () => {
    const [leaveHistory, setLeaveHistory] = useState([ // Add more leave history items here
    ]);
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

    const handleDelete = (index,id) => {
        // Add your delete logic here
        const updatedHistory = leaveHistory.filter((_, i) => i !== index);
        deleteLeave(id)
        setLeaveHistory(updatedHistory);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-6">
            <div className="container mx-auto">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-400" />
                        Leave History
                    </h2>

                    <div className="space-y-4">
                        {leaveHistory.map((leave, index) => (
                            <div 
                                key={index} 
                                className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{leave.leaveType}</h3>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-gray-300 text-sm">
                                                Duration: {leave.startDate.split('T')[0]} to {leave.endDate.split('T')[0]} ({leave.duration})
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                Applied on: {leave.appliedOn.split('T')[0]}
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                Reason: {leave.reason}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`
                                            px-3 py-1 rounded-full text-xs
                                            ${leave.status === 'Approved' ? 'bg-green-500/20 text-green-500' :
                                            leave.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                            'bg-red-500/20 text-red-500'}
                                        `}>
                                            {leave.status}
                                        </span>
                                        <Button
                                            size="sm"
                                            className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                            onClick={() => handleDelete(index, leave._id)}
                                        >
                                            <FaTrash className="text-sm" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveHistory;