import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {renewMoodleUserToken} from '../../api/helper';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      await renewMoodleUserToken({username: username, password});
      navigation.navigate('dashboardcontext', {screen: 'frontpage'});
    } catch (error) {
      console.error(error);
    }
  };

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
      <TouchableOpacity onPress={() => navigation.push('register')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
