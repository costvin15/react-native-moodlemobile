import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AuthContext,
  ContextManager,
  CourseContext,
  DashboardContext,
} from './screens';
import {navigationRef} from './RootNavigation';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="contextmanager" headerMode={'none'}>
        <Stack.Screen name="contextmanager" component={ContextManager} />
        <Stack.Screen name="authcontext" component={AuthContext} />
        <Stack.Screen name="dashboardcontext" component={DashboardContext} />
        <Stack.Screen name="coursecontext" component={CourseContext} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
