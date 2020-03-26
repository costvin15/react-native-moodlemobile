import React, {useState} from 'react';
import {SafeAreaView, TextInput, StyleSheet, Button} from 'react-native';

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

  const getSiteInfo = async token => {
    const response = await fetch(
      `http://localhost/webservice/rest/server.php/\?wstoken\=${token}\&wsfunction\=core_webservice_get_site_info&moodlewsrestformat=json`,
    );
    const data = await response.json();
    console.log(data);
  };

  const makeLogin = async () => {
    const response = await fetch(
      `http://localhost/login/token.php?service=moodle_mobile_app&username=${email}&password=${password}`,
    );
    const {token, errorcode} = await response.json();

    if (errorcode) {
      console.log('Error: ' + errorcode);
    } else {
      console.log('Logado com sucesso: ' + token);
      getSiteInfo(token);
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
      <Button title={'Entrar'} onPress={makeLogin} />
    </SafeAreaView>
  );
};

export default Login;
