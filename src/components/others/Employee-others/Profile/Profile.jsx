import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { FaCamera, FaEdit, FaSave } from 'react-icons/fa';
import { updateProfile } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    department: user.department,
    position: user.position,
    joinDate: user.joinDate?.split('T')[0]
  });

const handleImageChange=(e)=>{
  const file = e.target.files[0];

  console.log('Selected file:🌟🌟🌟🌟', file);
  if (file) {
    setFormData({
      ...formData,
      profileImage: file
    });
}
}
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const formInfo = new FormData();
      
      // Append all text data
      formInfo.append('firstName', formData.firstName);
      formInfo.append('lastName', formData.lastName);
      formInfo.append('email', formData.email);
      formInfo.append('phone', formData.phone);
      formInfo.append('address', formData.address);
      
      // Append the profile image if it exists
      if (formData.profileImage) {
        formInfo.append('profileImage', formData.profileImage);
      }

      const response = await updateProfile(user._id, formInfo);
      
      if (response.data.status === 'success') {
        localStorage.setItem('userData', JSON.stringify(response.data.data.user));
        setIsEditing(false);
        toast.success('Profile updated successfully');
        // Refresh the page to show new image
        window.location.reload();
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-6">
      <div className="container mx-auto">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
            <Button
              color={isEditing ? "green" : "blue"}
              className="flex items-center gap-2"
              onClick={(e) => isEditing ? handleSubmit(e) : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <FaSave className="text-sm" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <FaEdit className="text-sm" />
                  <span>Edit Profile</span>
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={`http://localhost:3000/img/users/${user.profileImage}`}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white/20"
                />
                <label className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-all">
                  <FaCamera className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>handleImageChange(e)}
                  />
                </label>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white">{user.firstName} {user.lastName}</h3>
                <p className="text-blue-300">{user.position}</p>
              </div>
            </div>

            {/* Profile Details Form */}
            <div className="md:col-span-2">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                    rows="3"
                  />
                </div>
              </form>

              {/* Employment Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;