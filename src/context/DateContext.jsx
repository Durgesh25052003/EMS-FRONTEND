import {  createContext, useEffect, useState } from "react";


export const SetDateContext = createContext();

export const SetDateContextProvider = ({ children }) => {

    const [date, setDate] = useState(() => {
       return localStorage.getItem('lastResetDate') || new Date().toISOString();
    })
    const [MonthComp, setMonthComp] = useState(false)

    const checkMonthPassed = () => {
            const lastResetDateObj = new Date(date)
            const today = new Date()
            const montPassed = today.getFullYear() * 12 + today.getMonth()-(lastResetDateObj.getFullYear() * 12 + lastResetDateObj.getMonth());
            console.log(montPassed)
            if (montPassed >= 1) {
                setDate(new Date().toISOString())
                setMonthComp(true)
        }
    }

    useEffect(() => {
        localStorage.setItem('lastResetDate', date)
    }, [date])


    useEffect(() => {
        checkMonthPassed()
    }, [])

    return (
        <SetDateContext.Provider value={{ date, setDate,MonthComp }}>
            {children}
        </SetDateContext.Provider>
    );
};