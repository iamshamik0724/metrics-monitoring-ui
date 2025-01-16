import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MetricsContext } from '../context/MetricsContext';
import ChartjsPluginCrosshair from 'chartjs-plugin-crosshair';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartjsPluginCrosshair);

const Last10MinutesGraph = () => {

  const { metricsData } = useContext(MetricsContext);

  if (!metricsData || !metricsData.metrics || metricsData.metrics.length === 0) {
    return <div>Loading...</div>;
  }

  const statusColors = {
    200: "green",
    400: "orange",
    500: "red"
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };
  
  const randomLineColor = generateRandomColor();
   
  const datasets = metricsData.metrics.map((metric) => {
    const pointColors = metric.responseStatus.map((status) => statusColors[status] || "gray");
    return {
      label: `${metric.method} ${metric.route}`, 
      data: metric.responseTime, 
      fill: false,  
      borderColor: generateRandomColor(),  
      tension: 0.1,  
      pointBackgroundColor: pointColors 
    };
  });

  //const visibleTimestamps = metricsData.timestamps.filter((_, index) => index % 10 === 0);

  const chartData = {
    labels:  metricsData.timestamps,
    datasets: datasets
  };

  
  const options = {
      responsive: true,  
      plugins: {
        legend: {
          position: 'top',  // Position of the legend
        },
        tooltip: {
          mode: 'index',  // Tooltip shows data at the index closest to the mouse
          intersect: false,  // Tooltip appears when hovering over the line
        },
        crosshair: {
          line: {
            color: 'black', 
            width: 1,  
            dash: [5, 5],  
          },
          sync: {
            enabled: true,
            group: 1
          },
          zoom: {
            enabled: true
          },
          enabled: true, 
          onCrosshair: {
            x: {
              line: {
                color: 'black',  
                width: 2,
                dash: [5, 5]  
              }
            },
            y: {
              line: {
                color: 'black', 
                width: 2,
                dash: [5, 5] 
              }
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,  // Ensures the X-axis starts at 0
          ticks: {
            autoSkip: false,  // Do not auto skip any labels
            maxTicksLimit: 10,  // Maximum number of ticks shown on x-axis (adjust as needed)
            callback: (value, index) => {
              // Display labels for every nth point (e.g., every 10th label)
              return index % 10 === 0 ? value : '';  // Adjust '10' to your desired frequency
            }
          },
        },
        y: {
          beginAtZero: true,  // Ensures the Y-axis starts at 0
        }
      }
    };
  

  return (
    <div style={{ width: '100%', height: '700px' }}>
      <Line data={chartData} options={options}/>
    </div>
  );
};

export default Last10MinutesGraph;
