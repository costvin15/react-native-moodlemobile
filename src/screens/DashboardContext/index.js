import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Dashboard from './Dashboard';
import Messages from './Messages';
import About from './About';

const DashboardContext = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="dashboard">
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: 'Página Inicial',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="messages"
        component={Messages}
        options={{
          title: 'Mensagens',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="about"
        component={About}
        options={{
          title: 'Sobre',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="menu" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardContext;
