import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Page from './page';
import NotFound from './notfound';
import Resource from './resource';
import Feedback from './feedback';

const Modules = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none" initialRouteName="notfound">
      <Stack.Screen name="page" component={Page} />
      <Stack.Screen name="notfound" component={NotFound} />
      <Stack.Screen name="resource" component={Resource} />
      <Stack.Screen name="feedback" component={Feedback} />
    </Stack.Navigator>
  );
};

export default Modules;
