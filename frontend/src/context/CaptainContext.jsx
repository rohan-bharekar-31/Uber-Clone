import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({

    });
    return (
        <CaptainDataContext.Provider value={{captain,setCaptain}}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;