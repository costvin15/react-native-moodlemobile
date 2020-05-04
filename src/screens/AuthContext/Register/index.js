import React, {useState, useEffect, createRef} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {styles} from './styles';
import Provider from './provider';
import Locales from '../../../locales';
import {Page, LoadingIndicator} from '../../../components';

const Register = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields([
      {
        stringid: 'username',
        placeholder: Locales.t('username'),
        ref: createRef(),
      },
      {stringid: 'email', placeholder: Locales.t('email'), ref: createRef()},
      {
        stringid: 'password',
        placeholder: Locales.t('password'),
        ref: createRef(),
      },
      {
        stringid: 'firstname',
        placeholder: Locales.t('firstname'),
        ref: createRef(),
      },
      {
        stringid: 'lastname',
        placeholder: Locales.t('lastname'),
        ref: createRef(),
      },
    ]);
  }, []);

  const performRegister = async () => {
    try {
      setIsLoading(true);
      const values = {};
      fields.map(value => {
        values[value.stringid] = value.ref.current._lastNativeText || '';
      });
      await Provider.registerUser(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page
      appbar={{
        title: Locales.t('register'),
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
        }}>
        {fields.map(({stringid, placeholder, ref}) => {
          return (
            <TextInput
              ref={ref}
              key={stringid}
              style={{
                ...styles.marginTopDefault,
              }}
              placeholder={placeholder}
              placeholderTextColor={'#000'}
            />
          );
        })}

        <Button
          mode="contained"
          style={{
            ...styles.marginVerticalDefault,
          }}
          onPress={() => performRegister()}>
          {Locales.t('register')}
        </Button>

        <LoadingIndicator hasActivity={isLoading} />
      </View>
    </Page>
  );
};

export default Register;
