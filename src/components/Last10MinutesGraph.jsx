import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LogarithmicScale } from 'chart.js';
import { MetricsContext } from '../context/MetricsContext';
import ChartjsPluginCrosshair from 'chartjs-plugin-crosshair';
import { statusColors, getColorByStatus, StatusLegend } from './StatusColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartjsPluginCrosshair, LogarithmicScale);

const Last10MinutesGraph = () => {
  const { metricsData } = useContext(MetricsContext);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // Generate a single color for each route key
  const generateColorPalette = (index) => {
    const colors = [
      '#4CAF50', // Green
      '#2196F3', // Blue
      '#FFC107', // Amber
      '#FF5722', // Deep Orange
      '#9C27B0', // Purple
    ];
    return colors[1];
  };

  useEffect(() => {
    if (metricsData && metricsData.metrics && metricsData.metrics.length > 0) {
      const randomIndex = Math.floor(Math.random() * metricsData.metrics.length);
      const defaultLabel = `${metricsData.metrics[randomIndex].route}`;
      setSelectedLabel(defaultLabel);
    }
  }, [metricsData]);

  if (!metricsData || !metricsData.metrics || metricsData.metrics.length === 0) {
    return <div>Loading...</div>;
  }

  const datasets = metricsData.metrics.map((metric, index) => {
    const filteredResponseTime = metric.responseTime.map((value) => (value === -1 ? null : value));
    const pointColors = metric.responseStatus.map((status, idx) =>
      filteredResponseTime[idx] === null ? "transparent" : getColorByStatus(status)
    );

    const label = `${metric.route || "Unknown Route"}`;

    return {
      label: label, // Preserve route labels for graph
      data: filteredResponseTime, // Filtered Y-axis data
      fill: false,
      borderColor: generateColorPalette(index), // Unique color for each route
      tension: 0.5, // Smooth curve
      pointBackgroundColor: pointColors,
      hidden: label !== selectedLabel, // Show only the selected dataset
    };
  });

  const chartData = {
    labels: metricsData.timestamps, // All timestamps
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => {
            const originalLabels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            return originalLabels.map((label) => {
              if (label.text === selectedLabel) {
                label.fontStyle = 'bold';
                label.fontColor = '#000'; // Black for selected label
              } else {
                label.fontStyle = 'normal';
                label.fontColor = 'gray'; // Gray for unselected labels
              }
              return label;
            });
          },
        },
        onClick: (e, legendItem) => {
          setSelectedLabel(legendItem.text); // Update selected route on legend click
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return metricsData.timestamps[index]; // Show full timestamp in tooltip
          },
        },
      },
      crosshair: {
        line: {
          color: 'black',
          width: 1,
          dashPattern: [5, 5],
        },
        sync: {
          enabled: true,
          group: 1,
        },
        zoom: {
          enabled: false,
        },
      },
    },
    scales: {
        x: {
          ticks: {
            callback: (value, index) => {
              const fullTimestamp = metricsData.timestamps[index];
              const [date, time] = fullTimestamp.split('T');
              const formattedTime = time.split('+')[0];
              return `${date}\n${formattedTime}`;
            },
            maxTicksLimit: 5,
          },
          grid: {
            drawTicks: false,
          },
        },
        y: {
          type: 'logarithmic', // Set the y-axis to logarithmic scale
          ticks: {
            callback: (value) => {
              // Customize tick labels for better readability
              if ((value < 50 && value >=1) || ((value%100) === 0)) {
                return value; // Show key values
              }
              return ''; // Hide other values
            },
          },
          grid: {
            drawTicks: true,
          },
          title: {
            display: true,
            text: 'Response Time (ms)', // Y-axis title indicating milliseconds
            font: {
                size: 18, // Increase font size for the title
                weight: 'bold', // Optional: make it bold
            },
          },
        },
      },
      
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div style={{ width: '100%', height: '700px' }}>
      {/* Static Legend */}
      <StatusLegend />

      {/* Line Graph */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Last10MinutesGraph;
