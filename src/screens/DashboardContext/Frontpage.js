import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {SafeAreaView, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Timeline} from '../../blocks';

const Tab = createMaterialBottomTabNavigator();

const Dashboard = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Página Inicial',
      tabBarIcon: ({color}) => (
        <MaterialIcons name="home" color={color} size={26} />
      ),
    });
  });

  return (
    <SafeAreaView>
      <Timeline />
    </SafeAreaView>
  );
};

const Home = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({});
  });

  return (
    <Tab.Navigator initialRouteName="dashboard">
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        initialParams={{navigation}}
      />
    </Tab.Navigator>
  );
};

export default Home;
