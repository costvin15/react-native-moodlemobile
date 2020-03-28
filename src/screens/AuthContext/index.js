import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';

const AuthContext = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthContext;
