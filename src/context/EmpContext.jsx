import { createContext, useState, useEffect } from 'react';
import { getEmployee } from '../service/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getEmployee();
                setData(response);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployee();
    }, []);
   
    return (
        <AuthContext.Provider value={{ data }}>
            {children}
        </AuthContext.Provider>
    );
};
