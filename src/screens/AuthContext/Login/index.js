import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  Linking,
} from 'react-native';
import Api from '../../../api/helper';
import Provider from './provider';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [identityProviders, setIdentityProviders] = useState([]);

  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      color: '#000',
    },
  });

  const getUserToken = async () => {
    try {
      await Api.renewMoodleUserToken({username: username, password});
      navigation.navigate('dashboardcontext', {screen: 'frontpage'});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await Provider.getIdentityProviders();
      setIdentityProviders(data);
    })();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <TextInput
        placeholder={'Nome de usuario'}
        style={styles.input}
        placeholderTextColor={'#000'}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder={'Senha'}
        style={styles.input}
        placeholderTextColor={'#000'}
        onChangeText={text => setPassword(text)}
      />
      <Button title={'Entrar'} onPress={getUserToken} />

      {identityProviders.map(provider => (
        <TouchableOpacity
          onPress={() => {
            Provider.openBrowserForOAuthLogin(provider);
          }}>
          <Image
            source={{uri: provider.iconurl}}
            style={{width: 25, height: 25}}
          />
          <Text>{provider.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => navigation.push('register')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
