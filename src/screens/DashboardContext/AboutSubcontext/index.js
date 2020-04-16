import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from './Profile';

const AboutViews = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AboutViews;
