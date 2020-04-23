import React from 'react';
import {View, Button} from 'react-native';
import {Page} from '../../../components';
import {styles} from './styles';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const Activity = ({navigation, route}) => {
  const module = route?.params?.item;

  return (
    <Page
      appbar={{
        title: module?.name,
        canGoBack: navigation.canGoBack(),
        goBack: () => navigation.goBack(),
      }}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
          ...styles.marginVerticalDefault,
        }}>
        {console.log(route.params.item)}
        <Button
          title="Abrir atividade externa"
          onPress={() => {
            (async () => {
              const isSupported = await InAppBrowser.isAvailable();
              if (isSupported) {
                await InAppBrowser.open(module.url);
              }
            })();
          }}
        />
      </View>
    </Page>
  );
};

export default Activity;
