import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Card, List} from 'react-native-paper';

import {styles} from './styles';
import {Page} from '../../../components';
import {getCurrentUserDetails} from '../../../api/helper';

const About = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserDetails().then(data => setUser(data));
  }, []);

  return (
    <Page appbar={{title: 'Sobre'}}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
          ...styles.marginVerticalDefault,
        }}>
        <Card>
          <List.Section>
            <List.Subheader>Perfil</List.Subheader>
            <List.Item
              title={user?.fullname}
              description={user?.siteurl}
              left={() => (
                <Image
                  style={styles.profileImage}
                  source={{uri: user?.userpictureurl}}
                />
              )}
              onPress={() => {
                navigation.navigate('aboutsubcontext');
              }}
            />
          </List.Section>
        </Card>
      </View>
    </Page>
  );
};

export default About;
