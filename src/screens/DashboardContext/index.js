import React, {useState, useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Provider from './provider';
import {useTheme} from 'react-native-paper';

import Dashboard from './Dashboard';
import Messages from './Messages';
import About from './About';
import Locales from '../../locales';

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
          title: Locales.t('dashboard'),
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="messages"
        component={Messages}
        options={{
          title: Locales.t('messages'),
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
          title: Locales.t('about'),
          tabBarIcon: ({color}) => (
            <MaterialIcons name="menu" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardContext;
