import React, {useState} from 'react';
import {SafeAreaView, TextInput, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {callMoodleWebService} from '../api/helper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      color: '#000',
    },
  });

  const getSiteInfo = async () => {
    try {
      const {sitename} = await callMoodleWebService(
        'core_webservice_get_site_info',
      );
      console.log('Sitename: ' + sitename);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserToken = async () => {
    const response = await fetch(
      `http://localhost/login/token.php?service=moodle_mobile_app&username=${email}&password=${password}`,
    );
    const {token, errorcode} = await response.json();

    if (errorcode) {
      console.log('Error: ' + errorcode);
    } else {
      try {
        AsyncStorage.setItem('MOODLE_USER_TOKEN', token);
      } catch (error) {
        console.log(error);
      }
      console.log('Logado com sucesso: ' + token);
      getSiteInfo();
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder={'Email'}
        style={styles.input}
        placeholderTextColor={'#000'}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder={'Senha'}
        style={styles.input}
        placeholderTextColor={'#000'}
        onChangeText={text => setPassword(text)}
      />
      <Button title={'Entrar'} onPress={getUserToken} />
    </SafeAreaView>
  );
};

export default Login;
