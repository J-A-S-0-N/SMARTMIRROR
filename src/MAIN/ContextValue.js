import React, { createContext, useState, useContext, useEffect } from 'react';

const PowerContext = createContext();

export const usePower = () => useContext(PowerContext);

export const useContext = ({ children }) => {
    const [power, setPower] = useState(0);  

    const fetchPower = async () => {
        try {
            const response = await fetch('http://localhost:5000/getpower');
            const data = await response.json();
            setPower(data.powerusage); // Assuming the backend sends { powerusage: value }
        } catch (error) {
            console.error("Failed to fetch power", error);
        }
    };

    
    useEffect(() => {
        fetchPower();
        const interval = setInterval(fetchPower, 10000); // update every 10 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        < useContext.Provider value={{ power, setPower }}>
            {children}
        </useContext.Provider>
    );
};
