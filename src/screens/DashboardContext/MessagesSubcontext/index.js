import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import View from './View';
import Settings from './Settings';

const MessagesSubcontext = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="view" component={View} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MessagesSubcontext;
