"use client";
import React, { createContext, useContext, useState } from "react";

// Initial state for refresh context
const refreshI = {
    reload: false
};

// Create the context
const RefreshContext = createContext();

// Create the provider component
const RefreshProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(refreshI);

    return (
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};

// Custom hook to use the RefreshContext
export const useRefresh = () => {
    return useContext(RefreshContext);
};

export default RefreshProvider;
