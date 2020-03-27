import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Toolbar} from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../api/constants';

const SplashScreen = ({navigation}) => {
  const verifyLogin = async () => {
    const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
    if (!token) {
      navigation.replace('login');
    } else {
      navigation.replace('home');
    }
  };

  useEffect(() => {
    verifyLogin();
  });

  return (
    <SafeAreaView>
      <Toolbar title={'Hello, World!'} />
    </SafeAreaView>
  );
};

export default SplashScreen;
