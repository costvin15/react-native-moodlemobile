import React from 'react';
import {View, Text} from 'react-native';
import {Page} from '../../../components';

const Activity = ({navigation, route}) => {
  return (
    <Page
      appbar={{
        title: route?.params?.item.name,
        canGoBack: navigation.canGoBack(),
        goBack: () => navigation.goBack(),
      }}>
      {console.log(route.params.item)}
      <Text>Hello, Activity</Text>
    </Page>
  );
};

export default Activity;
