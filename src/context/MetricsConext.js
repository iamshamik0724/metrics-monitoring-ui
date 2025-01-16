import React, { useState } from "react";

export const MetricsContext = React.createContext()

export const MetricsContextProvider = ({children}) =>{
    const [metrics, setMetrics] = useState(null)
    return (
        <MetricsContext.Provider value={{metrics, setMetrics}}>
            {children}
        </MetricsContext.Provider>
    )
}