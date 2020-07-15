import React from 'react';
import {View} from 'react-native';
import {Button, Title, Paragraph} from 'react-native-paper';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {styles} from './styles';
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
      <View
        style={{
          ...styles.marginVerticalDefault,
          ...styles.marginHorizontalDefault,
        }}>
        <Title>Uh, oh!</Title>
        <Paragraph style={{...styles.marginTopDefault}}>
          Sua organização instalou um plugin que não é suportado ainda.
        </Paragraph>
        <Paragraph style={{...styles.bold}}>
          Contate o administrador do site e diga que você deseja usar essa
          atividade no aplicativo Moodle Mobile.
        </Paragraph>
        <Paragraph style={{...styles.bold}}>
          Você ainda pode usar isso no navegador do seu dispositivo
        </Paragraph>
        <Button
          mode="contained"
          style={{...styles.marginVerticalDefault}}
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
