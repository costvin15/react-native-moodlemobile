import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, DefaultTheme} from 'react-native-paper';

import {
  AuthContext,
  ContextManager,
  CourseContext,
  DashboardContext,
  AboutSubcontext,
  MessagesSubcontext,
} from './screens';
import Modules from './modules';
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
        <Stack.Screen name="aboutsubcontext" component={AboutSubcontext} />
        <Stack.Screen
          name="messagessubcontext"
          component={MessagesSubcontext}
        />
        <Stack.Screen name="modulescontext" component={Modules} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Main = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
};

export default Main;
