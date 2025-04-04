import './App.css';
import Login from "./components/Auth/Login"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EmployeeDashBoard from './components/Dashboard/EmployeeDashBoard';
import authCheck from './components/Auth/VerifyRole';
import AdminDashboard from '../src/components/Dashboard/AdminDashBoard';
import { DrawerWithNavigation } from './components/others/Admin-Others/AdminDrawer';
import AdminEmpDash from './components/others/Admin-Others/AdminEmpDash/AdminEmpDash';
import AddEmployee from './src/components/others/Admin-Others/AddEmployee';
import { AttendanceProvider } from './context/AttendanceContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TotalEmployee from './components/others/Admin-Others/AdminEmpDash/AdminEmpDashSubSec/TotalEmployee';
import LeaveManagement from './components/others/Admin-Others/Leave-management/Leave-management';
import { LeaveProvider } from './context/leaveContext';
import PasswordReset from './pages/resetPassword';
import { EventProvider } from './context/EventContext';
import { SetDateContextProvider } from './context/DateContext';
import { AuthProvider } from './context/EmpContext';
import LeaveRequest from './components/others/Employee-others/LeaveRequest/LeaveRequest';
import LeaveHistory from './components/others/Employee-others/LeaveRequest/LeaveHistory';
import Profile from './components/others/Employee-others/Profile/Profile';
import LoginPage from './components/Auth/Login';
import EventManagement from './components/others/Admin-Others/Events-management/Event-Management';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

// Remove top-level await
await authCheck();

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin-dashboard',
    element: (
        <AdminDashboard />
    ),
    children: [
      {
        path: 'Admin-Welcome-page',
        element: <DrawerWithNavigation />
      },
      {
        path: 'AdminEmpDash',
        element: <AdminEmpDash />
      },
      {
        path: 'add-employee',
        element: <AddEmployee />
      },
      {
        path: 'total-employee',
        element: <TotalEmployee />
      },
      {
        path: 'leave-management',
        element: <LeaveManagement />
      },
      {
        path:'AdminEventDash',
        element:<EventManagement/>
      }
    ]
  },
  {
    path: '/reset-password/:token',
    element: <PasswordReset />
  },
  {
    path: '/employee-dashboard/:id',
    element: <EmployeeDashBoard />
  },
  {
    path: '/leave-request',
    element: <LeaveRequest />
  },
  {
    path: '/leave-history',
    element: <LeaveHistory />
  },
  {
    path:'/employee-profile',
    element:<Profile/>
  }
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SetDateContextProvider> 
        <AttendanceProvider>
        <AuthProvider>
          <EventProvider>
            <LeaveProvider>
            <ToastContainer position="top-right" autoClose={3000} />
              <RouterProvider router={router} />
            </LeaveProvider>
          </EventProvider>
        </AuthProvider>
        </AttendanceProvider>
      </SetDateContextProvider>
    </QueryClientProvider>
  );
};

export default App
