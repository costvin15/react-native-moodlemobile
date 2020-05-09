import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import Provider from './provider';
import Locales from '../../../../locales';

const Details = ({navigation, route}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Provider.getUserDetails(route.params.id).then(data => setUser(data));
  }, [route.params.id]);

  return (
    <Page
      appbar={{
        title: Locales.t('details'),
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <List.Section>
          <List.Subheader>Contato</List.Subheader>
          <List.Item title="Endereço de mail" description={user?.email} />
        </List.Section>

        <List.Section>
          <List.Subheader>Detalhes do usuário</List.Subheader>
          {user?.customfields?.map((field, index) => {
            let description = '';
            if (field.type === 'checkbox') {
              if (field.value === '1') {
                description = 'Sim';
              } else {
                description = 'Não';
              }
            } else if (field.type === 'datetime') {
              // TODO: Show date as string
            } else if (field.type === 'text') {
              description = field.value;
            }
            return (
              <List.Item
                key={index}
                title={field.name}
                description={description}
              />
            );
          })}
        </List.Section>
      </View>
    </Page>
  );
};

export default Details;
