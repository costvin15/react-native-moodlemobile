import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import View from './View';

const MessagesSubcontext = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="view" component={View} />
    </Stack.Navigator>
  );
};

export default MessagesSubcontext;
