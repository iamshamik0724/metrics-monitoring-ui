import React from "react";
import "../styles/StatusLegend.css";

export const statusColors = {
  200: "#4CAF50",
  400: "#FF9800",
  401: "#FF9800",
  500: "#F44336",
  default: "#9E9E9E",
};

export const getColorByStatus = (status) =>
  statusColors[status] || statusColors.default;

export const StatusLegend = () => (
  <div className="status-legend-container">
    <div className="status-legend-title"> Status Legends </div>
    <div className="status-item">
      <span className="status-color-box status-ok"></span>
      <span> 200 - OK</span>
    </div>
    <div className="status-item">
      <span className="status-color-box status-unauthorized"></span>
      <span> 400,401 - Unauthorized</span>
    </div>
    <div className="status-item">
      <span className="status-color-box status-server-error"></span>
      <span> 500 - Server Error</span>
    </div>
    <div className="status-item">
      <span className="status-color-box status-other"></span>
      <span>Other Statuses</span>
    </div>
  </div>
);
