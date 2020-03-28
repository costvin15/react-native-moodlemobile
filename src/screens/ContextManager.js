import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../api/constants';
import {updateCurrentUserDetails} from '../api/helper';

const SplashScreen = ({navigation}) => {
  const verifyLogin = async () => {
    const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
    if (!token) {
      navigation.replace('authcontext');
    } else {
      await updateCurrentUserDetails();
      navigation.replace('dashboardcontext');
    }
  };

  useEffect(() => {
    verifyLogin();
  });

  return <></>;
};

export default SplashScreen;
