import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {Page} from '../../../../components';
import Provider from './provider';

const Grades = ({navigation}) => {
  useEffect(() => {
    Provider.getGrades();
  }, []);

  return (
    <Page
      appbar={{
        title: 'Notas',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <Text>Hello</Text>
      </View>
    </Page>
  );
};

export default Grades;
