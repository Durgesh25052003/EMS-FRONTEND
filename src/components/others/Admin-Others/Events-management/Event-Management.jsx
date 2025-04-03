import { useState } from 'react';
import { Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaBriefcase, FaFileAlt } from 'react-icons/fa';
import { createEvent } from '../../../../service/apiService';

const EventManagement = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'other',
    department: '',
    description: ''
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your event creation logic here
    const res=await createEvent(eventData)
    console.log(res)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-6">
      <div className="container mx-auto">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400" />
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="relative">
                <Input
                  type="text"
                  label="Event Title"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "text-gray-100"
                  }}
                  containerProps={{
                    className: "min-w-[100px]"
                  }}
                  color="white"
                />
              </div>

              {/* Event Type */}
              <Select
                label="Event Type"
                value={eventData.type}
                onChange={(value) => setEventData({ ...eventData, type: value })}
                className="!border-t-blue-gray-200"
                labelProps={{
                  className: "text-gray-100"
                }}
                color="white"
              >
                <Option value="meeting">Meeting</Option>
                <Option value="deadline">Deadline</Option>
                <Option value="training">Training</Option>
                <Option value="company">Company Event</Option>
                <Option value="other">Other</Option>
              </Select>

              {/* Date */}
              <div className="relative">
                <Input
                  type="date"
                  label="Date"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "text-blue-gray-200"
                  }}
                />
              </div>

              {/* Time */}
              <div className="relative">
                <Input
                  type="time"
                  label="Time"
                  value={eventData.time}
                  onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "text-blue-gray-200"
                  }}
                />
              </div>

              {/* Location */}
              <div className="relative">
                <Input
                  type="text"
                  label="Location"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "text-blue-gray-200"
                  }}
                  icon={<FaMapMarkerAlt className="text-blue-400" />}
                />
              </div>

              {/* Department */}
              <div className="relative">
                <Input
                  type="text"
                  label="Department"
                  value={eventData.department}
                  onChange={(e) => setEventData({ ...eventData, department: e.target.value })}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "text-blue-gray-200"
                  }}
                  icon={<FaBriefcase className="text-blue-400" />}
                />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <Textarea
                label="Description"
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                className="!border-t-blue-gray-200 focus:!border-blue-500"
                labelProps={{
                  className: "text-blue-gray-200"
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button 
                type="button"
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                onClick={() => setEventData({
                  title: '',
                  date: '',
                  time: '',
                  location: '',
                  type: 'other',
                  department: '',
                  description: ''
                })}
              >
                Clear
              </Button>
              <Button 
                type="submit"
                className="bg-blue-500 text-white"
              >
                Create Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;