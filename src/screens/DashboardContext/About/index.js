import React, {useState, useEffect} from 'react';
import {getCurrentUserDetails} from '../../../api/helper';
import {SafeAreaView, StatusBar, Text, Image, Button} from 'react-native';
import Provider from './provider';

const About = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserDetails().then(data => setUser(data));
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <Image
        source={{uri: user?.userpictureurl}}
        style={{height: 50, width: 50}}
      />
      <Text>{user?.fullname}</Text>
      <Button onPress={() => Provider.performLogout(navigation)} title="Sair" />
    </SafeAreaView>
  );
};

export default About;
