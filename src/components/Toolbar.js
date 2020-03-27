import React from 'react';
import {View, Text} from 'react-native';

const Toolbar = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default Toolbar;
