import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {callMoodleWebService} from '../../api/helper';

const ADMIN_WS_TOKEN = 'e88b9e281fe641bb1f3fdb156201a89c';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fields, setFields] = useState([]);
  const [sitepasswordpolicy, setSitePasswordpolicy] = useState('');

  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      color: '#000',
    },
  });

  const getSignupSettings = async () => {
    try {
      const {namefields, passwordpolicy} = await callMoodleWebService(
        'auth_email_get_signup_settings',
        {
          wstoken: ADMIN_WS_TOKEN,
        },
      );
      const fieldList = [];
      for (const field of namefields) {
        const placeholder = await callMoodleWebService('core_get_string', {
          stringid: field,
          wstoken: ADMIN_WS_TOKEN,
        });
        fieldList.push({stringid: field, placeholder, ref: createRef()});
      }

      setFields(fieldList);
      setSitePasswordpolicy(passwordpolicy);
    } catch (error) {
      console.error(error);
    }
  };

  const makeRegister = async () => {
    const values = {};
    fields.map(value => {
      values[value.stringid] = value.ref.current._lastNativeText;
    });
    try {
      const response = await callMoodleWebService('auth_email_signup_user', {
        username,
        password,
        email,
        ...values,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSignupSettings();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      {fields.map(({stringid, placeholder, ref}) => {
        return (
          <TextInput
            key={stringid}
            ref={ref}
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor={'#000'}
          />
        );
      })}
      <TextInput
        placeholder={'Nome de usuario'}
        style={styles.input}
        placeholderTextColor={'#000'}
        onChangeText={text => setUsername(text)}
      />
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
      <Text>{sitepasswordpolicy}</Text>
      <Button onPress={makeRegister} title={'Registrar'} />
    </SafeAreaView>
  );
};

export default Register;
