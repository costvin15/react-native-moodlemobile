import React from 'react';
import {SafeAreaView} from 'react-native';
import {Toolbar} from '../components';

const Home = () => {
  return (
    <SafeAreaView>
      <Toolbar title={'Hello, World!'} />
    </SafeAreaView>
  );
};

export default Home;
