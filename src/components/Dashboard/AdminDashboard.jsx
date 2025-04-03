import { Button } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/EmpContext";
import { useLocation } from "react-router-dom";  // Add this import at the top
import LoadingBar from "react-top-loading-bar";
import authCheck from "../Auth/VerifyRole";


await authCheck();

const AdminDashboard = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [showQuote, setShowQuote] = useState(true);
  const navigator = useNavigate();
  const { data } = useContext(AuthContext);
  const location = useLocation();
  const loadingBar = useRef(null);

  const startLoading = () => {
    console.log("Loading started"); // Add this log to check if the function is being called
    loadingBar.current.continuousStart();
    setTimeout(() => loadingBar.current.complete(), 1500); // Simulate loading
  };
  useEffect(() => {
    // Reset hasStarted when returning to the root admin dashboard path
    if (location.pathname === '/admin-dashboard') {
      setHasStarted(false);
      setShowQuote(true);
    }
  }, [location]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (data) {
          setQuote(data.content);
          setAuthor(data.author);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        // Fallback quote in case of API failure
        setQuote("Success is not final, failure is not fatal: it is the courage to continue that counts.");
        setAuthor("Winston Churchill");
      }
    };

    let interval;
    if (!hasStarted) {
      fetchQuote();
      interval = setInterval(() => {
        fetchQuote();
        setShowQuote(true);
        setTimeout(() => setShowQuote(false), 10000);
      }, 30000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [hasStarted]);

  const handleLetsGo = () => {
    setHasStarted(true);
    setShowQuote(false);
    navigator('Admin-Welcome-Page');
  };

  const handleLogout = () => {
      startLoading();
      // Clear user data
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      
      setTimeout(() => {
        navigator('/');
      }, 1000);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <LoadingBar color="white" height={3} ref={loadingBar} shadow={true} />
        <nav className="px-8 py-4 bg-white/10 backdrop-blur-md shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-semibold">EMS</span>
            </div>
  
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  size="md"
                  className="ring-2 ring-white/50"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-white">Welcome Admin</h1>
                  <span className="text-sm text-blue-200">{data?.email || 'admin@example.com'}</span>
                </div>
              </div>
  
              <Button
                color="white"
                variant="outlined"
                onClick={handleLogout}
                className="flex items-center gap-2 hover:bg-white hover:text-blue-900 transition-all"
              >
                <span>Logout</span>
              </Button>
          </div>
        </div>
      </nav>
  
      <div className={`fixed bottom-4 right-4 max-w-md transition-all duration-500 ${showQuote ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
        <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 shadow-xl">
          <p className="text-white text-lg font-medium italic">"{quote}"</p>
          <p className="text-blue-200 text-right mt-2">- {author}</p>
        </div>
      </div>
  
      <div className="container mx-auto p-6">
        {!hasStarted || location.pathname === '/admin-dashboard' ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
            <h2 className="text-4xl font-bold text-white text-center">
              Welcome to Employee Management System
            </h2>
            <p className="text-blue-200 text-xl text-center max-w-2xl">
              Manage your organization's workforce efficiently and effectively
            </p>
            <Button
              color="white"
              size="lg"
              className="mt-4 px-8 py-3 text-lg hover:scale-105 transition-transform"
              onClick={() => {
                handleLetsGo()
                startLoading()
              }
              }
            >
              Get Started
            </Button>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;