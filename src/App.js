import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext, ContextManager, DashboardContext} from './screens';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="contextmanager" headerMode={'none'}>
        <Stack.Screen name="contextmanager" component={ContextManager} />
        <Stack.Screen name="authcontext" component={AuthContext} />
        <Stack.Screen name="dashboardcontext" component={DashboardContext} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
