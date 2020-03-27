import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, TextInput} from 'react-native';
import {callMoodleWebService} from '../api/helper';

const Register = () => {
  const [fields, setFields] = useState([]);
  const [passwordpolicy, setPasswordpolicy] = useState('');

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
      const {namefields, passwordpolicy, warnings} = await callMoodleWebService(
        'auth_email_get_signup_settings',
      );
      const fieldList = [];
      for (const field of namefields) {
        const placeholder = await callMoodleWebService('core_get_string', {
          stringid: field,
        });
        fieldList.push({stringid: field, placeholder});
      }

      setFields(fieldList);
      setPasswordpolicy(passwordpolicy);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSignupSettings();
  }, []);

  return (
    <SafeAreaView>
      {fields.map(({stringid, placeholder}) => {
        return (
          <TextInput
            key={stringid}
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor={'#000'}
          />
        );
      })}
      <TextInput
        placeholder={'Email'}
        style={styles.input}
        placeholderTextColor={'#000'}
      />
      <TextInput
        placeholder={'Senha'}
        style={styles.input}
        placeholderTextColor={'#000'}
      />
      <Text>{passwordpolicy}</Text>
    </SafeAreaView>
  );
};

export default Register;
