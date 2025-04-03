import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeaveContext } from '../../../../context/leaveContext';

const AdminEmpDash = () => {
    // const [showPopup, setShowPopup] = useState(false);
    // const [totalEmpl, setTotalEmpl] = useState(0);
    const [leaveStats, setLeaveStats] = useState({
        Pending: 0,
        Approved: 0,
        Rejected: 0,
        Total: 0
    });
    const [showPopup, setShowPopup] = useState('');

    const navigator = useNavigate();

    const leaves = useLeaveContext();

    useEffect(() => {
        try {
            if (leaves) {
                const stats = leaves.reduce((acc, leave) => {
                    acc[leave.status]++;
                    acc.Total++;
                    console.log(acc);
                    return acc;
                }, { Pending: 0, Approved: 0, Rejected: 0, Total: 0 });

                setLeaveStats(stats);
            }
        } catch (error) {
            console.error('Error fetching leave stats:', error);
        }
    }, [leaves])

    const LeavePopup = ({ count, type }) => (
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl shadow-xl z-10 transition-all duration-300">
            <div className="flex items-center gap-2">
                <span className="font-medium">{`Total ${type}:`}</span>
                <span className="font-bold text-xl">{count}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-4 my-6">
                <h1 className="text-white font-bold text-3xl bg-white/5 backdrop-blur-md p-4 rounded-lg">DASHBOARD OVERVIEW</h1>
                <div className="flex gap-4">
                    <div className="max-w-sm p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4" 
                        onClick={() => navigator('/admin-dashboard/total-employee')}>
                        <div className="w-20 filter invert opacity-80">
                            <img src="/emplogo.png" alt="" className="transform hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="text-white font-extrabold border-l-2 border-white/30 pl-4 py-2">
                            TOTAL EMPLOYEE
                        </h2>
                    </div>

                    <div className="max-w-sm p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4">
                        <div className="w-20">
                            <img src="/company.png" alt="" className="transform hover:scale-110 transition-transform opacity-80" />
                        </div>
                        <h2 className="text-white font-extrabold border-l-2 border-white/30 pl-4 py-2">
                            Total Department
                        </h2>
                    </div>

                    <div className="max-w-sm p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4">
                        <div className="w-20 filter invert opacity-80">
                            <img src="/cashlogo.png" alt="" className="transform hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="text-white font-extrabold border-l-2 border-white/30 pl-4 py-2">
                            Total Salary
                        </h2>
                    </div>
                </div>

                <div className="gap-1.5 flex flex-col items-center my-10 bg-white/5 backdrop-blur-md p-6 rounded-xl" 
                    onClick={() => navigator('/admin-dashboard/leave-management')}>
                    <h1 className="text-white font-bold text-3xl mb-6">LEAVE DETAILS</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Leave Request Card */}
                        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4">
                            <div className="w-20 filter invert opacity-80">
                                <img src="/paper.png" alt="" className="transform hover:scale-110 transition-transform" />
                            </div>
                            <div className="relative">
                                <h2 className="text-white font-extrabold border-l-2 border-blue-400/30 pl-4 py-2"
                                    onMouseEnter={() => setShowPopup('Total')}
                                    onMouseLeave={() => setShowPopup('')}>
                                    Leave Request
                                    <span className="block text-blue-200 mt-1 text-sm font-normal">
                                        Total Requests: {leaveStats.Total}
                                    </span>
                                </h2>
                                {showPopup === 'Total' && <LeavePopup count={leaveStats.Total} type="Requests" />}
                            </div>
                        </div>

                        {/* Approved Leave Card */}
                        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4">
                            <div className="w-20 filter invert opacity-80">
                                <img src="/tick.png" alt="" className="transform hover:scale-110 transition-transform" />
                            </div>
                            <div className="relative">
                                <h2 className="text-white font-extrabold border-l-2 border-green-400/30 pl-4 py-2"
                                    onMouseEnter={() => setShowPopup('Approved')}
                                    onMouseLeave={() => setShowPopup('')}>
                                    Leave Approved
                                    <span className="block text-green-400 mt-1 text-sm font-normal">
                                        Count: {leaveStats.Approved}
                                    </span>
                                </h2>
                                {showPopup === 'Approved' && <LeavePopup count={leaveStats.Approved} type="Approved" />}
                            </div>
                        </div>

                        {/* Pending Leave Card */}
                        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4">
                            <div className="w-20 filter invert opacity-80">
                                <img src="/hourglass.png" alt="" className="transform hover:scale-110 transition-transform" />
                            </div>
                            <div className="relative">
                                <h2 className="text-white font-extrabold border-l-2 border-yellow-400/30 pl-4 py-2"
                                    onMouseEnter={() => setShowPopup('Pending')}
                                    onMouseLeave={() => setShowPopup('')}>
                                    Leave Pending
                                    <span className="block text-yellow-400 mt-1 text-sm font-normal">
                                        Count: {leaveStats.Pending}
                                    </span>
                                </h2>
                                {showPopup === 'Pending' && <LeavePopup count={leaveStats.Pending} type="Pending" />}
                            </div>
                        </div>

                        {/* Rejected Leave Card */}
                        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-4">
                            <div className="w-20 filter invert opacity-80">
                                <img src="/cross.png" alt="" className="transform hover:scale-110 transition-transform" />
                            </div>
                            <div className="relative">
                                <h2 className="text-white font-extrabold border-l-2 border-red-400/30 pl-4 py-2"
                                    onMouseEnter={() => setShowPopup('Rejected')}
                                    onMouseLeave={() => setShowPopup('')}>
                                    Leave Rejected
                                    <span className="block text-red-400 mt-1 text-sm font-normal">
                                        Count: {leaveStats.Rejected}
                                    </span>
                                </h2>
                                {showPopup === 'Rejected' && <LeavePopup count={leaveStats.Rejected} type="Rejected" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
// const TotalEmployeePopup = ({ totalEmpl, showPopup }) => {
//     return (
//         <div className={`absolute bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 ${showPopup ? "animate-fade-in" : "animate-fade-out"
//             }`}>
//             <h2 className="text-white font-extrabold border-2 border-white px-10 py-7 cursor-pointer">
//                 Total Employee: {totalEmpl}
//             </h2>
//         </div>
//     );
// };



export default AdminEmpDash