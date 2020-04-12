import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import Provider from './provider';
import {styles} from './styles';

const Participants = ({route}) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    Provider.getParticipants(route.params.id).then(data =>
      setParticipants(data),
    );
  }, [route.params.id]);

  return (
    <SafeAreaView>
      <FlatList
        data={participants}
        keyExtractor={item => item.id}
        renderItem={({index, item}) => (
          <TouchableOpacity>
            <View
              style={{
                ...styles.marginHorizontalDefault,
                ...styles.marginTopDefault,
                ...(index === participants.length - 1
                  ? styles.marginBottomDefault
                  : {}),
              }}>
              <Card>
                <View style={{...styles.paddingDefault, ...styles.row}}>
                  <Image
                    source={{uri: item.profileimageurl}}
                    style={styles.userImage}
                  />
                  <Text>{item.fullname}</Text>
                </View>
              </Card>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Participants;
