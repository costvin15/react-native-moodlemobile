import React, {useState, useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Provider from './provider';
import {useTheme} from 'react-native-paper';

import Dashboard from './Dashboard';
import Messages from './Messages';
import About from './About';

const DashboardContext = () => {
  const [unreadConversations, setUnreadConversations] = useState(0);
  const Theme = useTheme();

  useEffect(() => {
    Provider.getUnreadConversationsCount().then(data =>
      setUnreadConversations(data),
    );
  }, []);

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      barStyle={{
        backgroundColor: Theme.colors.primary,
      }}>
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
          tabBarBadge: unreadConversations !== 0 ? unreadConversations : false,
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
