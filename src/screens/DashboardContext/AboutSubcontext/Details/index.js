import React from 'react';
import {Page} from '../../../../components';
import {View, Text} from 'react-native';

const Details = ({navigation}) => {
  return (
    <Page
      appbar={{
        title: 'Detalhes',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <Text>Hello, Details</Text>
      </View>
    </Page>
  );
};

export default Details;
