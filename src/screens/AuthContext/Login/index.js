import React, {useState, useEffect} from 'react';
import Provider from './provider';
import {Page} from '../../../components';
import {TextInput, Button} from 'react-native-paper';
import {View} from 'react-native';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';
import Locales from '../../../locales';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [identityProviders, setIdentityProviders] = useState([]);
  const Theme = useTheme();

  useEffect(() => {
    (async () => {
      const data = await Provider.getIdentityProviders();
      setIdentityProviders(data);
    })();
  }, []);

  return (
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
          onPress={() => Provider.makeLogin({navigation, username, password})}>
          {Locales.t('login')}
        </Button>

        {identityProviders?.map(provider => (
          <Button
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
      </View>
    </Page>
  );
};

export default Login;
