import React, {useEffect} from 'react';
import {Page} from '../../../../components';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import Provider from './provider';

const Details = ({navigation}) => {
  useEffect(() => {
    Provider.getUserDetails(246);
  }, []);

  return (
    <Page
      appbar={{
        title: 'Detalhes',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <List.Section>
          <List.Subheader>Contato</List.Subheader>
          <List.Item title="Endereço de mail" description="ss" />
        </List.Section>
      </View>
    </Page>
  );
};

export default Details;
