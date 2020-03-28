import React from 'react';
import {SafeAreaView} from 'react-native';
import {Timeline} from '../../blocks';

const Dashboard = ({navigation, route}) => {
  return (
    <SafeAreaView>
      <Timeline />
    </SafeAreaView>
  );
};

export default Dashboard;
