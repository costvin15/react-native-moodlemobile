import React, {useState, useEffect} from 'react';
import {getCurrentUserDetails} from '../../../api/helper';
import {SafeAreaView, Text, Image} from 'react-native';

const About = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserDetails().then(data => setUser(data));
  }, []);

  return (
    <SafeAreaView>
      <Image
        source={{uri: user?.userpictureurl}}
        style={{height: 50, width: 50}}
      />
      <Text>{user?.fullname}</Text>
    </SafeAreaView>
  );
};

export default About;
