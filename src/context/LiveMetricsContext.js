import React, { useEffect, useContext } from "react";
import { MetricsContext } from "./MetricsContext";
import CONFIG from "../config/config";

const LiveMetricsContextProvider = ({ children }) => {
  const { metricsData, setMetricsData } = useContext(MetricsContext);

  useEffect(() => {
    const socket = new WebSocket(CONFIG.WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("Received live data:", newData);

      const updatedMetricsData = { ...metricsData };
      const routeIndex = updatedMetricsData.metrics.findIndex(
        (metric) => metric.route === newData.route,
      );

      if (routeIndex !== -1) {
        updatedMetricsData.metrics[routeIndex].responseTime.push(newData.time);
        updatedMetricsData.metrics[routeIndex].responseStatus.push(
          newData.status,
        );
      } else {
        updatedMetricsData.metrics.push({
          route: newData.route,
          responseTime: [newData.time],
          responseStatus: [newData.status],
        });
      }

      if (!updatedMetricsData.timestamps.includes(newData.timestamp)) {
        updatedMetricsData.timestamps.push(newData.timestamp);
      }

      setMetricsData(updatedMetricsData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [setMetricsData]);

  return <>{children}</>;
};

export default LiveMetricsContextProvider;
