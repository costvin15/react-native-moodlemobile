import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Card, Divider, FAB, List} from 'react-native-paper';
import {styles} from './styles';
import {emmitEvent} from '../../../../api/helper';
import Provider from './provider';

const Profile = ({navigation, route}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Provider.getUserById({id: route.params?.id}).then(data => setUser(data));
  }, [route]);

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
            {console.log(user)}
            <Image
              source={{uri: user?.profileimageurl}}
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
              onPress={() => {
                emmitEvent('core.user.message.send', {touserid: user?.id});
              }}
            />
            <Text style={styles.messageText}>Mensagem</Text>
          </TouchableOpacity>
          <Divider />
          <View>
            <List.Item
              title="Detalhes"
              left={() => <List.Icon icon="account" />}
              onPress={() => {
                emmitEvent('core.user.details', {id: user?.id});
              }}
            />
            <Divider />
            <List.Item
              title="Mensagens do blog"
              left={() => <List.Icon icon="newspaper" />}
              onPress={() => {
                emmitEvent('core.user.blogmessages', {id: user?.id});
              }}
            />
            <Divider />
            <List.Item
              title="Emblemas"
              left={() => <List.Icon icon="trophy" />}
              onPress={() => {}}
            />
          </View>
        </Card>
      </View>
    </Page>
  );
};

export default Profile;
