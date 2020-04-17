import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import Provider from './provider';

const Details = ({navigation}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Provider.getUserDetails().then(data => setUser(data));
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
          <List.Item title="Endereço de mail" description={user?.email} />
        </List.Section>
      </View>
    </Page>
  );
};

export default Details;
