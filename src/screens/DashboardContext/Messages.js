import React, {useEffect} from 'react';

import {SafeAreaView, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Dashboard = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Mensagens',
      tabBarIcon: ({color}) => (
        <MaterialIcons name="chat" color={color} size={26} />
      ),
    });
  });

  return (
    <SafeAreaView>
      <Text>Messages</Text>
    </SafeAreaView>
  );
};

export default Dashboard;
