import React, {useEffect} from 'react';

import {SafeAreaView, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Timeline} from '../../blocks';

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

export default Dashboard;
