import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 

import Last10MinutesGraph from './Last10MinutesGraph';

const MetricsDashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Last 10 Minutes Metrics</Tab>
      </TabList>
      <TabPanel>
        <Last10MinutesGraph />
      </TabPanel>
    </Tabs>
  );
};

export default MetricsDashboard;
