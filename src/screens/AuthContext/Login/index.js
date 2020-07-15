import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

import {styles} from './styles';
import Provider from './provider';
import Locales from '../../../locales';
import {TextInput, Button} from 'react-native-paper';
import {Page, LoadingIndicator, Dialog} from '../../../components';

const Login = ({navigation}) => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [identityProviders, setIdentityProviders] = useState([]);
  const Theme = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const data = await Provider.getIdentityProviders();
        setIdentityProviders(data);
      } catch (error) {
        console.error(error);
        setHasError(error);
      }
    })();
  }, []);

  const performLogin = async () => {
    try {
      setIsLoading(true);
      await Provider.makeLogin({navigation, username, password});
    } catch (error) {
      console.error(error);
      setHasError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Page appbar={{title: Locales.t('login')}}>
        <View
          style={{
            ...styles.marginHorizontalDefault,
            ...styles.marginVerticalDefault,
          }}>
          <TextInput
            label={Locales.t('username')}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setUsername(text)}
          />

          <TextInput
            label={Locales.t('password')}
            mode="outlined"
            secureTextEntry={true}
            style={{...styles.marginTopDefault}}
            onChangeText={text => setPassword(text)}
          />

          <Button
            mode="contained"
            style={{...styles.marginTopDefault}}
            onPress={() => performLogin()}>
            {Locales.t('login')}
          </Button>

          {identityProviders?.map(provider => (
            <Button
              key={provider.name}
              icon={provider.name.toLowerCase()}
              mode="contained"
              style={{...styles.marginTopDefault}}
              theme={{
                colors: {
                  primary:
                    provider.name === 'Google'
                      ? '#ab000d'
                      : provider.name === 'Facebook'
                      ? '#002171'
                      : Theme.colors.primary,
                },
              }}
              onPress={() => {
                Provider.openBrowserForOAuthLogin({...provider, navigation});
              }}>
              {provider.name}
            </Button>
          ))}

          <Button
            mode="contained"
            style={{...styles.marginTopDefault}}
            onPress={() => navigation.push('register')}>
            {Locales.t('createanewaccount')}
          </Button>

          <LoadingIndicator hasActivity={isLoading} />
        </View>
      </Page>

      {hasError && (
        <Dialog
          visible
          doneText="OK"
          title="Ocorreu um erro"
          content={hasError.error}
          onDismiss={() => {
            setHasError(null);
          }}
        />
      )}
    </>
  );
};

export default Login;
