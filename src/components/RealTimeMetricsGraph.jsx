import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LogarithmicScale } from 'chart.js';
import { MetricsContext } from '../context/MetricsContext';
import ChartjsPluginCrosshair from 'chartjs-plugin-crosshair';
import { statusColors, getColorByStatus, StatusLegend } from './StatusLegend';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartjsPluginCrosshair, LogarithmicScale);

const RealTimeMetricsGraph = () => {
  const { metricsData } = useContext(MetricsContext);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // Set default label on the first render only
  useEffect(() => {
    if (metricsData && metricsData.metrics && metricsData.metrics.length > 0 && selectedLabel === null) {
      const defaultLabel = `${metricsData.metrics[0].route}`;
      setSelectedLabel(defaultLabel); // Set the first route as the default label
    }
  }, [metricsData, selectedLabel]);

  if (!metricsData || !metricsData.metrics || metricsData.metrics.length === 0) {
    return <div>Loading...</div>;
  }

  const datasets = metricsData.metrics.map((metric, index) => {
    const filteredResponseTime = metric.responseTime.map((value) => (value === -1 ? null : value));
    const pointColors = metric.responseStatus.map((status, idx) =>
      filteredResponseTime[idx] === null ? 'transparent' : getColorByStatus(status)
    );

    const label = `${metric.route || 'Unknown Route'}`;

    return {
      label,
      data: filteredResponseTime,
      fill: false,
      borderColor: statusColors[index % statusColors.length], // Unique color per route
      tension: 0.5,
      pointBackgroundColor: pointColors,
      hidden: label !== selectedLabel, // Show only the selected dataset
    };
  });

  const chartData = {
    labels: metricsData.timestamps,
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
            return originalLabels.map((label) => ({
              ...label,
              fontStyle: label.text === selectedLabel ? 'bold' : 'normal',
              fontColor: label.text === selectedLabel ? '#000' : 'gray',
            }));
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
            return metricsData.timestamps[index];
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
        type: 'logarithmic',
        ticks: {
          callback: (value) => {
            if ((value < 50 && value >= 1) || value % 100 === 0) {
              return value;
            }
            return '';
          },
        },
        grid: {
          drawTicks: true,
        },
        title: {
          display: true,
          text: 'Response Time (ms)',
          font: {
            size: 18,
            weight: 'bold',
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
      <StatusLegend />
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RealTimeMetricsGraph;
