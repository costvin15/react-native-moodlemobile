import React, {useState} from 'react';
import {Page} from '../../../../components';
import {Card} from 'react-native-paper';
import {View, Text, Switch} from 'react-native';
import {styles} from './styles';
import Locales from '../../../../locales';

const Settings = ({navigation}) => {
  const [emailNotification, setEmailNotification] = useState(false);
  const [sendWithEnter, setSendWithEnter] = useState(false);

  return (
    <Page
      appbar={{
        title: Locales.t('settings'),
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
          ...styles.marginVerticalDefault,
        }}>
        <Card>
          <Card.Title title={Locales.t('notificationpreferences')} />
          <Card.Content
            style={{
              ...styles.rowDirection,
              ...styles.spaceBetween,
              ...styles.alignCenter,
            }}>
            <Text>{Locales.t('email')}</Text>
            <Switch
              value={emailNotification}
              onValueChange={() => setEmailNotification(!emailNotification)}
            />
          </Card.Content>
        </Card>

        <Card style={{...styles.marginTopDefault}}>
          <Card.Title title={Locales.t('general')} />
          <Card.Content
            style={{
              ...styles.rowDirection,
              ...styles.spaceBetween,
              ...styles.alignCenter,
            }}>
            <Text>{Locales.t('useentertosend')}</Text>
            <Switch
              value={sendWithEnter}
              onValueChange={() => setSendWithEnter(!sendWithEnter)}
            />
          </Card.Content>
        </Card>
      </View>
    </Page>
  );
};

export default Settings;
