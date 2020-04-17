import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from './Profile';
import Details from './Details';
import BlogMessages from './BlogMessages';

const AboutViews = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="details" component={Details} />
      <Stack.Screen name="blogmessages" component={BlogMessages} />
    </Stack.Navigator>
  );
};

export default AboutViews;
