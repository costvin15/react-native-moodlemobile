import React, {useState, useEffect} from 'react';
import Provider from './provider';
import {Page} from '../../../components';
import {TextInput, Button} from 'react-native-paper';
import {View} from 'react-native';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';

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
    <Page appbar={{title: 'Login'}}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
          ...styles.marginVerticalDefault,
        }}>
        <TextInput
          label="Nome de usuário"
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={true}
          style={{...styles.marginTopDefault}}
          onChangeText={text => setPassword(text)}
        />

        <Button
          mode="contained"
          style={{...styles.marginTopDefault}}
          onPress={() => Provider.makeLogin({navigation, username, password})}>
          Entrar
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
          Criar uma nova conta
        </Button>
      </View>
    </Page>
  );
};

export default Login;
