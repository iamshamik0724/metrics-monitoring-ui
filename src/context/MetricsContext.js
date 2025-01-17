import React, { useState, useEffect } from "react";

export const MetricsContext = React.createContext();

export const MetricsContextProvider = ({ children }) => {
  const [metricsData, setMetricsData] = useState(null);

  const fetchMetricsData = async () => {
    try {
      const response = await fetch('http://localhost:8085/metrics');
      if (!response.ok) throw new Error("Failed to fetch metrics");
      const data = await response.json();
      console.log(data)
      setMetricsData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMetricsData();
  }, []); 

  return (
    <MetricsContext.Provider value={{ metricsData, setMetricsData }}>
      {children}
    </MetricsContext.Provider>
  );
};
