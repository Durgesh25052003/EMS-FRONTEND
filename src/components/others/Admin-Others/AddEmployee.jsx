import { useRef, useState } from 'react';
import { AddEmployee } from '../../../service/apiService';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';

const CreateEmployee = () => {
  const [formDataRaw, setFormDataRaw] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    employeeId: '',
    joiningDate: '',
    salary: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    status: 'active',
    password: '',
    profileImage: null
  });
  const loadingBar = useRef(null);

  const startLoading = () => {
    loadingBar.current.continuousStart();
    setTimeout(() => loadingBar.current.complete(), 2000); // Simulate loading
  };
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataRaw({
      ...formDataRaw,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:🌟🌟🌟🌟', file);
    if (file) {
      setFormDataRaw({
        ...formDataRaw,
        profileImage: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  };

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Form data:', formDataRaw);
    const formData = new FormData();
    formData.append('firstName', formDataRaw.firstName);
    formData.append('lastName', formDataRaw.lastName);
    formData.append('email', formDataRaw.email);
    formData.append('phone', formDataRaw.phone);
    formData.append('position', formDataRaw.position);
    formData.append('department', formDataRaw.department);
    formData.append('salary', formDataRaw.salary);
    formData.append('employeeId', formDataRaw.employeeId);
    formData.append('joiningDate', formDataRaw.joiningDate);
    formData.append('address', formDataRaw.address);
    formData.append('city', formDataRaw.city);
    formData.append('state', formDataRaw.state);
    formData.append('zipCode', formDataRaw.zipCode);
    formData.append('country', formDataRaw.country);
    formData.append('status', formDataRaw.status);
    formData.append('password', formDataRaw.password);
    formData.append('profileImage', formDataRaw.profileImage);

    console.log('Form submitted:', formData);
    const res=await AddEmployee(formData)
    console.log(res)
    if(res.status===200){
      toast.success('Employee added successfully!');
    }else{
      toast.error('Error adding employee');
    }
  } catch (error) {
    toast.error(error.message || 'Something went wrong');
    }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
    <LoadingBar color="white" ref={loadingBar} />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white">Create New Employee</h2>
            <p className="mt-1 text-sm text-blue-200">Add a new employee to your organization</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            {/* Profile Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Profile Information</h3>

              {/* Profile Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">Profile Photo</label>
                <div className="flex items-center">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-4 border border-gray-200">
                    {previewImage ? (
                      <img src={previewImage} alt="Profile preview" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profile-image"
                    />
                    <label
                      htmlFor="profile-image"
                      className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-900 hover:bg-gray-50 cursor-pointer"
                    >
                      Upload Photo
                    </label>
                    <p className="mt-1 text-xs text-gray-100">JPG, PNG or GIF up to 2MB</p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formDataRaw.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formDataRaw.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formDataRaw.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formDataRaw.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Employment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-white mb-1">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formDataRaw.employeeId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="joiningDate" className="block text-sm font-medium text-white mb-1">
                    Joining Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formDataRaw.joiningDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-white mb-1">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formDataRaw.position}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-white mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formDataRaw.department}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  >
                    <option value="" >Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-white mb-1">
                    Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={formDataRaw.salary}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-white mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formDataRaw.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  >
                    <option value="active">Active</option>
                    <option value="onLeave">On Leave</option>
                    <option value="terminated">Terminated</option>
                    <option value="probation">Probation</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Address Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formDataRaw.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formDataRaw.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-white mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formDataRaw.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-white mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formDataRaw.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formDataRaw.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Setup */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Account Setup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                    Initial Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formDataRaw.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-100">Employee will be prompted to change it on first login</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0a1929] border border-transparent rounded-md text-sm font-medium text-white hover:bg-[#0d2440] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={(e)=>{
                  handleSubmit(e);
                  startLoading();
                }}
              >
                Create Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;