import React from 'react';
import {Page} from '../../../../../components';
import {View, Text} from 'react-native';

const ViewGrade = ({navigation}) => {
  return (
    <Page
      appbar={{
        title: 'Grade',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <Text>View Grade</Text>
      </View>
    </Page>
  );
};

export default ViewGrade;
