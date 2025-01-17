import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 

import Last10MinutesGraph from './Last10MinutesGraph.jsx';
import RealTimeMetricsGraph from './RealTimeMetricsGraph.jsx';
import LiveMetricsContextProvider from '../context/LiveMetricsContext.js';

const MetricsDashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Last 10 Minutes Metrics</Tab>
        <Tab>Live Metrics</Tab>
      </TabList>
      <TabPanel>
        <Last10MinutesGraph />
      </TabPanel>
      <TabPanel>
        <LiveMetricsContextProvider>
          <RealTimeMetricsGraph />
        </LiveMetricsContextProvider>
      </TabPanel>
    </Tabs>
  );
};

export default MetricsDashboard;
