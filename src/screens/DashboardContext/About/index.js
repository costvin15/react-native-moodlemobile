import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Card, List, Divider} from 'react-native-paper';

import Locales from '../../../locales';
import {styles} from './styles';
import {Page} from '../../../components';
import {getCurrentUserDetails} from '../../../api/helper';
import {emmitEvent} from '../../../api/helper';
import Provider from './provider';

const About = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserDetails().then(data => setUser(data));
  }, []);

  return (
    <Page appbar={{title: Locales.t('about')}}>
      <View
        style={{
          ...styles.marginHorizontalDefault,
          ...styles.marginVerticalDefault,
        }}>
        <Card>
          <List.Section>
            <List.Subheader>{Locales.t('profile')}</List.Subheader>
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
                emmitEvent('core.user.view', {id: user?.userid});
              }}
            />
          </List.Section>

          <Divider />

          <List.Section>
            <List.Item
              title={Locales.t('grades')}
              left={props => <List.Icon {...props} icon="poll" />}
              onPress={() => {
                navigation.navigate('aboutsubcontext', {
                  screen: 'grades',
                });
              }}
            />
            <List.Item
              title={Locales.t('signout')}
              left={props => <List.Icon {...props} icon="logout" />}
              onPress={() => Provider.performLogout(navigation)}
            />
          </List.Section>
        </Card>
      </View>
    </Page>
  );
};

export default About;
