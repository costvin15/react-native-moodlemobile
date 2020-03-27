import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Login, Register, SplashScreen} from './screens';

const App = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="splashscreen">
        <Drawer.Screen name="login" component={Login} />
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="register" component={Register} />
        <Drawer.Screen name="splashscreen" component={SplashScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
