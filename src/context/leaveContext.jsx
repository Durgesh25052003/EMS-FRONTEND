import { createContext, useContext, useEffect, useState } from 'react';
import { getLeave } from '../service/apiService';
import { RiContactsBookLine } from 'react-icons/ri';

// Create the context
const LeaveContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const LeaveProvider = ({ children }) =>{

   const [leaves, setLeaves] = useState([])

   useEffect(() => {
       const fetchData = async () => {
           const data = await getLeave();
        
           setLeaves(data.data.leaves);
       };
       fetchData();
   }, [])
   

  console.log(leaves)
    return (
        <LeaveContext.Provider value={ leaves }>    
            {children}
        </LeaveContext.Provider>
    );
};

// Custom hook to use the LeaveContext
// eslint-disable-next-line react-refresh/only-export-components
export const useLeaveContext = () => {
    const context = useContext(LeaveContext);
    if (!context) {
        throw new Error('useLeaveContext must be used within a LeaveProvider');
    }
    return context;
};