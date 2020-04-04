import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import View from './View';

const Course = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="view" component={View} />
    </Stack.Navigator>
  );
};

export default Course;
