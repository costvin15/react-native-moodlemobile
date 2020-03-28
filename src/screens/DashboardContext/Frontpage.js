import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {View, StatusBar, Text} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

const Stack = createStackNavigator();

const Dashboard = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View>
          <View style={{height: 20, backgroundColor: '#0077c2'}}>
            <StatusBar backgroundColor="blue" barStyle="default" />
          </View>
          <Toolbar
            leftElement="menu"
            onLeftElementPress={() => {
              route.params.navigation.toggleDrawer();
            }}
            centerElement="Página inicial"
          />
        </View>
      ),
    });
    console.log(navigation);
  });

  return (
    <>
      <Text>Hello, World!</Text>
    </>
  );
};

const Home = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({});
  });

  return (
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        initialParams={{navigation}}
      />
    </Stack.Navigator>
  );
};

export default Home;
