import React from "react";

// Define status colors
export const statusColors = {
  200: '#4CAF50', // Green
  400: '#FF9800', // Orange
  401: '#FF9800', // Orange
  500: '#F44336', // Red
  default: '#9E9E9E', // Grey for unknown statuses
};

// Function to get a color based on the status
export const getColorByStatus = (status) => statusColors[status] || statusColors.default;

export const StatusLegend = () => (
    <div style={{ display: 'flex', flexDirection: 'rows', alignItems: 'flex-start', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 5px' }}> Status Legends </div>  
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 5px' }}>
        <span style={{ width: '15px', height: '15px', backgroundColor: '#4CAF50', display: 'inline-block', marginRight: '5px' }}></span>
        <span> 200 - OK</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 5px' }}>
        <span style={{ width: '15px', height: '15px', backgroundColor: '#FF9800', display: 'inline-block', marginRight: '5px' }}></span>
        <span> 400,401 - Unauthorized</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 5px' }}>
        <span style={{ width: '15px', height: '15px', backgroundColor: '#F44336', display: 'inline-block', marginRight: '5px' }}></span>
        <span> 500 - Server Error</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 5px' }}>
        <span style={{ width: '15px', height: '15px', backgroundColor: '#9E9E9E', display: 'inline-block', marginRight: '5px' }}></span>
        <span>Other Statuses</span>
      </div>
    </div>
  );
