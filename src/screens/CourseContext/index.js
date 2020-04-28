import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import View from './View';
import Activity from './Activity';

const CourseContext = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="activity" component={Activity} />
      <Stack.Screen name="view" component={View} />
    </Stack.Navigator>
  );
};

export default CourseContext;
