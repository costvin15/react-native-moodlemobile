import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaView, Text} from 'react-native';
import {Toolbar} from 'react-native-material-ui';

const Stack = createStackNavigator();

const Dashboard = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SafeAreaView>
          <Toolbar
            leftElement="menu"
            onLeftElementPress={() => {
              route.params.navigation.toggleDrawer();
            }}
            centerElement="Página inicial"
          />
        </SafeAreaView>
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

const Home = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        initialParams={{navigation}}
      />
    </Stack.Navigator>
  );
};

export default Home;
