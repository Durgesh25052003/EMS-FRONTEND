import axios from 'axios'
import { FaGoodreadsG } from 'react-icons/fa';

const userApi = axios.create({
  baseURL: 'https://ems-backend-1.vercel.app/api/v1/user',
  withCredentials: true,
});

const leaveApi = axios.create({
  baseURL: 'https://ems-backend-1.vercel.app/api/v1/leave',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const eventApi = axios.create({
  baseURL: 'https://ems-backend-1.vercel.app/api/v1/events',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const login = async ({ email, password }) => {
  try {
    const res = await userApi.post('/login', {
      email,
      password
    });
    console.log(res)
    if (res.data.token) {
      // Remove manual cookie setting as it should be handled by the server
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      sessionStorage.setItem("userData", JSON.stringify(res.data.user));
    }
    return res;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export const verifyToken = async (token) => {
  try {
    console.log(token)
    const res = await userApi.get('/verify-token', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const AddEmployee = (formData) => {
  try {
    const res=userApi.post('/add-employee', formData)
    return res
  } catch (error) {
    console.log(error)
  }
}
export const getEmployee = async () => {
  try {
    // Add this at the top of your file after the axios import
    const res = await userApi.get('/get-employee');
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const getLeave = async () => {
  try {
    const res = await leaveApi.get('/leaves',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res
  } catch (error) {
    console.log(error)
  }
}
export const getEmpLeave = async (id) => {
  try {
    const res = await leaveApi.get(`/emp-leaves/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res
  } catch (error) {
    console.log(error)
  }
}
export const deleteLeave = async (id) => {
  try {
    const res = await leaveApi.delete(`/delete-leave/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export const updateLeave = async (id, updatedLeave) => {
  try {
    const res = await leaveApi.put(`/leaves/${id}`, updatedLeave);
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createLeave = async (leave) => {
  try {
    const res = await leaveApi.post('/create-leave', leave, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export const forgetPassword = async (email) => {
  try {
    const res = await userApi.post('/forget-Password', {
      email
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await userApi.patch('/reset-password', {
      token,
      newPassword
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTask = async (id, task) => {
  try {
    console.log(id, task)
    const res = await userApi.patch(`/addTask/${id}`, task)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export const getEvents = () => {
  try {
    const res = eventApi.get('/get-events', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createEvent = async (event) => {
  try {
    const res = await eventApi.post('/create-event', event, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const addEvent = async (event, user) => {
  const eventId = event._id;
  try {
    const res = await eventApi.patch(`/add-event/${eventId}`,user,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }

}


export const addEmpEvent = async (emp, event) => {
  try {
    const token = localStorage.getItem('token');
    const empId = emp._id;
    const res = await userApi.patch(`/add-event/${empId}`, event, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateProfile = async (id, data) => {
  try {
    const res = await userApi.post(`/update-profile/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }

}

export const updateTaskStatus = async (userId, taskId, status) => {
  try {
    const res = await userApi.patch(`/update-task-status/${userId}`,
      {
        taskId,
        status
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};
