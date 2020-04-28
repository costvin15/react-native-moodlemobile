import React, {useState, useEffect, createRef} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {styles} from './styles';
import Provider from './provider';
import {Page} from '../../../components';

const Register = ({navigation}) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields([
      {stringid: 'username', placeholder: 'Nome de usuário', ref: createRef()},
      {stringid: 'email', placeholder: 'Email', ref: createRef()},
      {stringid: 'password', placeholder: 'Senha', ref: createRef()},
      {stringid: 'firstname', placeholder: 'Nome', ref: createRef()},
      {stringid: 'lastname', placeholder: 'Sobrenome', ref: createRef()},
    ]);
  }, []);

  return (
    <Page
      appbar={{
        title: 'Registro',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
        }}>
        {fields.map(({stringid, placeholder, ref}) => {
          return (
            <TextInput
              ref={ref}
              key={stringid}
              style={{
                ...styles.marginTopDefault,
              }}
              placeholder={placeholder}
              placeholderTextColor={'#000'}
            />
          );
        })}

        <Button
          mode="contained"
          style={{
            ...styles.marginVerticalDefault,
          }}
          onPress={() => {
            const values = {};
            fields.map(value => {
              values[value.stringid] = value.ref.current._lastNativeText;
            });
            Provider.registerUser(values);
          }}>
          Registrar
        </Button>
      </View>
    </Page>
  );
};

export default Register;
