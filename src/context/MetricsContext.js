import React, { useState, useEffect } from "react";
import CONFIG from "../config/config";

export const MetricsContext = React.createContext();

export const MetricsContextProvider = ({ children }) => {
  const [metricsData, setMetricsData] = useState(null);

  const fetchMetricsData = async () => {
    try {
      const response = await fetch(CONFIG.METRICS_HTTP_URL);
      if (!response.ok) throw new Error("Failed to fetch metrics");
      const data = await response.json();
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
