import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {Page} from '../../components';

const NotFound = ({navigation, route}) => {
  const params = route.params.item;

  const openInBrowser = async ({url}) => {
    await InAppBrowser.open(url);
  };

  return (
    <Page
      appbar={{
        title: params?.name,
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        <Text>Uh, oh!</Text>
        <Text>
          Sua organização instalou um plugin que não é suportado ainda.
        </Text>
        <Text>
          Contate o administrador do site e diga que você deseja usar essa
          atividade no aplicativo Moodle Mobile.
        </Text>
        <Text>Você ainda pode usar isso no navegador do seu dispositivo</Text>
        <Button
          onPress={() => {
            openInBrowser({url: params?.url});
          }}>
          Abrir no navegador
        </Button>
      </View>
    </Page>
  );
};

export default NotFound;
