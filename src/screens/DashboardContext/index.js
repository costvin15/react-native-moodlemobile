import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Frontpage from './Frontpage';

const DashboardContext = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="frontpage">
      <Drawer.Screen name="frontpage" component={Frontpage} />
    </Drawer.Navigator>
  );
};

export default DashboardContext;
