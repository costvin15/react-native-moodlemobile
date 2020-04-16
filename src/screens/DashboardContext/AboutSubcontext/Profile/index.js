import React from 'react';
import {Page} from '../../../../components';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Card, Divider, FAB} from 'react-native-paper';
import {styles} from './styles';

const Profile = ({navigation, route}) => {
  const user = route.params?.user;

  return (
    <Page
      appbar={{
        title: 'Perfil',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View
        style={{
          ...styles.marginVerticalDefault,
          ...styles.marginHorizontalDefault,
        }}>
        <Card>
          <View
            style={{
              ...styles.centerItems,
              ...styles.marginHorizontalDefault,
              ...styles.marginVerticalDefault,
            }}>
            <Image
              source={{uri: user?.userpictureurl}}
              style={styles.profileImage}
            />
            <Text style={styles.profileFullname}>{user?.fullname}</Text>
          </View>
          <Divider />
          <TouchableOpacity
            style={{
              ...styles.centerItems,
              ...styles.marginHorizontalDefault,
              ...styles.marginVerticalDefault,
            }}
            onPress={() => {}}>
            <FAB
              icon="message-outline"
              color="white"
              style={styles.messageFab}
            />
            <Text style={styles.messageText}>Mensagem</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </Page>
  );
};

export default Profile;
