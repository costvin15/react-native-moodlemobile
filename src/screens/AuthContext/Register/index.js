import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {callMoodleWebService} from '../../../api/helper';
import Constants from '../../../api/constants';
import Provider from './provider';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fields, setFields] = useState([]);

  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      color: '#000',
    },
  });

  useEffect(() => {
    setFields([
      {stringid: 'firstname', placeholder: 'Nome', ref: createRef()},
      {stringid: 'lastname', placeholder: 'Sobrenome', ref: createRef()},
    ]);
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
      <Button
        onPress={() => {
          const values = {};
          fields.map(value => {
            values[value.stringid] = value.ref.current._lastNativeText;
          });
          Provider.registerUser({
            username,
            password,
            email,
            ...values,
          });
        }}
        title={'Registrar'}
      />
    </SafeAreaView>
  );
};

export default Register;
