import React from 'react';
import { Button, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RiDashboardLine, RiUserLine, RiBuildingLine, RiMoneyDollarCircleLine, RiSettings3Line, RiMenuLine } from 'react-icons/ri';

export const DrawerWithNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg">
        <div className="flex items-center gap-3">
          <Button 
            onClick={showLoading} 
            className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border-none flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg"
          >
            <RiMenuLine className="text-xl" />
            <span className="font-medium">Menu</span>
          </Button>
          <div className="h-6 w-[1px] bg-white/20"></div>
          <span className="text-white/60 text-sm">Dashboard Navigation</span>
        </div>
        <div className={`flex items-center gap-2 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-white/70 text-sm">Menu Active</span>
        </div>
      </div>

      <Drawer
        closable

        destroyOnClose
        title={
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <div>
              <p className="text-xl font-semibold text-[#1a237e]">EMS Portal</p>
              <p className="text-sm text-[#1a237e]/70">Admin Dashboard</p>
            </div>
          </div>
        }
        placement="left"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        className="bg-gradient-to-br from-indigo-900 to-gray-900"
      >
        <div className='flex flex-col h-full'>
          <div className="p-4 mb-6 bg-white/10 backdrop-blur-md rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                <RiUserLine className="text-2xl text-[#1a237e]" />
              </div>
              <div>
                <p className="text-[#1a237e] font-semibold">Admin Panel</p>
                <p className="text-sm text-[#1a237e]/70">Manage your system</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 mb-8'>
            <button 
              className='flex items-center gap-3 text-[#1a237e] bg-white/80 hover:bg-white hover:text-[#0d1457] px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md font-semibold cursor-pointer'
              onClick={() => navigate('/admin-dashboard/AdminEmpDash')}
            >
              <RiDashboardLine className="text-xl" /> Dashboard
            </button>
            
            <button 
              className='flex items-center gap-3 text-[#1a237e] bg-white/80 hover:bg-white hover:text-[#0d1457] px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md font-semibold cursor-pointer'
              onClick={() => navigate('/admin-dashboard/add-employee')}
            >
              <RiUserLine className="text-xl" /> Employee
            </button>
            
            <button 
              className='flex items-center gap-3 text-[#1a237e] bg-white/80 hover:bg-white hover:text-[#0d1457] px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md font-semibold cursor-pointer'
              onClick={() => navigate('/admin-dashboard/AdminEventDash')}
            >
              <RiBuildingLine className="text-xl" /> Events
            </button>
            
            <button 
              className='flex items-center gap-3 text-[#1a237e] bg-white/80 hover:bg-white hover:text-[#0d1457] px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md font-semibold cursor-pointer'
            >
              <RiMoneyDollarCircleLine className="text-xl" /> Salary
            </button>
            
            <button 
              className='flex items-center gap-3 text-[#1a237e] bg-white/80 hover:bg-white hover:text-[#0d1457] px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md font-semibold cursor-pointer'
            >
              <RiSettings3Line className="text-xl" /> Setting
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <img 
              src="/admin-illustration.gif" 
              alt="Admin Dashboard" 
              className="w-64 h-64 object-contain opacity-90"
            />
            <p className="text-indigo-200 text-center text-sm font-medium">
              Welcome to Admin Dashboard
              <br />
              Manage your organization efficiently
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};