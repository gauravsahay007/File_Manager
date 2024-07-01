// context/FolderContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

// Define initial state for the context
const initialState = {
   parentFolderId: 0,
   refresh: false
};

// Create the context
const FolderContext = createContext();

// Create the provider component
const FolderDataProvider = ({ children }) => {
    const [folderState, setFolderState] = useState(initialState);

    return (
        <FolderContext.Provider value={{ folderState, setFolderState }}>
            {children}
        </FolderContext.Provider>
    );
};

// Custom hook to use the FolderContext
export const useFolderData = () => {
    return useContext(FolderContext);
};

export default FolderDataProvider;
