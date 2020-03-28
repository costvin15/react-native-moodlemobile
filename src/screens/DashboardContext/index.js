import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Dashboard from './Dashboard';
import Messages from './Messages';

const DashboardContext = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="dashboard">
      <Tab.Screen name="dashboard" component={Dashboard} />
      <Tab.Screen name="messages" component={Messages} />
    </Tab.Navigator>
  );
};

export default DashboardContext;
