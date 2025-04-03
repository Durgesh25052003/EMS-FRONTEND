import React, { useEffect, useState } from "react"
import { Check, X, Calendar, Search, Clock, CheckCircle2, XCircle, AlertCircle, MoreHorizontal } from "lucide-react"
import { useLeaveContext } from "../../../../context/leaveContext"
import { updateLeave } from "../../../../service/apiService"

// Mock data - replace with your actual API fetch


const LeaveManagement = () => {
  const [leaves, setLeave] = useState([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedLeaveId, setSelectedLeaveId] = useState(null)
  const [viewDetailsId, setViewDetailsId] = useState(null);
  // Fetch leave requests on component mount
  
  const leaveFetch = useLeaveContext();

  useEffect(() => {
    setLeave(leaveFetch)

  }, [leaveFetch]);

  // Filter leave requests based on status and search term
  const filteredLeaveRequests = leaves.filter((leave) => {
    const matchesFilter = filter === "all" || leave.status === filter
    const matchesSearch =
      leave.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })
  
  // Count leave requests by status
  const pendingCount = leaves.filter((leave) => leave.status === "Pending").length
  const approvedCount = leaves.filter((leave) => leave.status === "Approved").length
  const rejectedCount = leaves.filter((leave) => leave.status === "Rejected").length

  // Handle leave approval
  const handleApprove = (id) => {

    const approvedLeaves= leaves.map(leave=>{
      if(leave._id===id){
        leave.status="Approved",
        leave.approvedOn=new Date().toISOString().split('T')[0]
      }
      return leave
    })
    setLeave(approvedLeaves)
    const updateApprovedLeave= leaves.find(leave=>{
      if(leave._id===id) return leave
    })
    // Calling Api to update the update leave collection
    updateLeave(id,updateApprovedLeave)
  }

  // Handle leave rejection
  const handleReject = (id) => {
    const updateRejectedLeaves= leaves.map(leave=>{
      if(leave._id===id){
        leave.status="Rejected"
      }
    })
    

    const updateRejectedLeave = leaves.find(leave => leave._id === id)
  
    // // Calling Api to update the update leave collection
    // updateLeave(id,updateRejectedLeave)
    setSelectedLeaveId(id)
    setShowRejectionModal(true)
  }

  // Confirm leave rejection with reason
  const confirmReject = () => {

    const updatedLeaves = leaves.map((leave) => {
      if (leave._id === selectedLeaveId) {
        return {
          ...leave,
          status: 'Rejected',
          rejectedOn: new Date().toISOString().split('T')[0],
          rejectionReason: rejectionReason
        };
      }
      return leave;
    });
   setLeave(updatedLeaves)

   const currRejectedLeave=updatedLeaves.find(leave=>{
    return leave._id===selectedLeaveId
   })
   
// Calling Api to update the update leave collection
   updateLeave(selectedLeaveId, currRejectedLeave)
    
    setShowRejectionModal(false)
    setRejectionReason("")
    setSelectedLeaveId(null)
  }

  // Toggle leave details view
  const toggleDetails = (id) => {
    setViewDetailsId(viewDetailsId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white my-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Employee Leave Management</h1>
          <p className="text-blue-600">Review, approve, and manage employee leave requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Pending Requests</p>
                <p className="text-3xl font-bold text-white">{pendingCount}</p>
              </div>
              <div className="rounded-full bg-blue-400 bg-opacity-30 p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Approved Leaves</p>
                <p className="text-3xl font-bold text-white">{approvedCount}</p>
              </div>
              <div className="rounded-full bg-green-400 bg-opacity-30 p-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-100">Rejected Leaves</p>
                <p className="text-3xl font-bold text-white">{rejectedCount}</p>
              </div>
              <div className="rounded-full bg-red-400 bg-opacity-30 p-3">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => setFilter("Pending")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "pending" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("Approved")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "approved" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("Rejected")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "rejected" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Rejected
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID or leave type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-80"
            />
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold">Employee</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold">Leave Type</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold">Duration</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold">Applied On</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeaveRequests.length > 0 ? (
                  filteredLeaveRequests.map((leave) => (
                    <React.Fragment key={leave._id}>
                      <tr className="hover:bg-blue-50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:3000/img/users/${leave.employee.profileImage}`}
                              alt={leave.employee.firstName}
                              className="h-10 w-10 rounded-full"
                            />
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{leave.employee.firstName}</div>
                              <div className="text-sm text-gray-500">
                                {leave.employee.employeeId} • {leave.employee.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{leave.leaveType}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-blue-500" />
                            {leave.duration}
                          </div>
                          <div className="text-xs text-gray-400">
                            {leave.startDate.split("T")[0]} to {leave.endDate.split("T")[0]}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {leave.status === "Pending" && (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Pending
                            </span>
                          )}
                          {leave.status === "Approved" && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Approved
                            </span>
                          )}
                          {leave.status === "Rejected" && (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              <XCircle className="mr-1 h-3 w-3" />
                              Rejected
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{leave.appliedOn.split('T')[0]}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => toggleDetails(leave._id)}
                              className="rounded-full bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            {leave.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(leave._id)}
                                  className="rounded-full bg-green-100 p-2 text-green-600 hover:bg-green-200"
                                  title="Approve"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleReject(leave._id)}
                                  className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
                                  title="Reject"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                      {viewDetailsId === leave._id && (
                        <tr className="bg-blue-50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="rounded-lg bg-white p-4 shadow">
                              <h4 className="mb-2 font-medium text-blue-800">Leave Details</h4>
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <p className="text-sm text-gray-500">Reason:</p>
                                  <p className="text-sm font-medium">{leave.reason}</p>
                                </div>
                                {leave.status === "Approved" && (
                                  <div>
                                    <p className="text-sm text-gray-500">Approved On:</p>
                                    <p className="text-sm font-medium">{leave.approvedOn}</p>
                                  </div>
                                )}
                                {leave.status === "Rejected" && (
                                  <>
                                    <div>
                                      <p className="text-sm text-gray-500">Rejected On:</p>
                                      <p className="text-sm font-medium">{leave.rejectedOn}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Rejection Reason:</p>
                                      <p className="text-sm font-medium">{leave.rejectionReason}</p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No leave requests found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Reject Leave Request</h3>
            <div className="mb-4">
              <label htmlFor="rejectionReason" className="mb-2 block text-sm font-medium text-gray-700">
                Reason for Rejection
              </label>
              <textarea
                id="rejectionReason"
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Please provide a reason for rejecting this leave request..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRejectionModal(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectionReason.trim()}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                  rejectionReason.trim() ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaveManagement

