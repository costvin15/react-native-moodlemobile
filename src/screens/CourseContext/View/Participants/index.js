import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Divider} from 'react-native-paper';
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
      <Card
        style={{
          ...styles.marginTopDefault,
          ...styles.marginHorizontalDefault,
        }}>
        <FlatList
          data={participants}
          keyExtractor={item => item.id}
          renderItem={({index, item}) => (
            <>
              <TouchableOpacity>
                <View>
                  <View
                    style={{
                      ...styles.paddingDefault,
                      ...styles.row,
                      ...styles.alignCenter,
                    }}>
                    <Image
                      source={{uri: item.profileimageurl}}
                      style={styles.userImage}
                    />
                    <View style={{...styles.marginLeftDefault}}>
                      <Text>{item.fullname}</Text>
                      {item.lastaccesstime && (
                        <Text>Último acesso: {item.lastaccesstime}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {index !== participants.length - 1 && <Divider />}
            </>
          )}
        />
      </Card>
    </SafeAreaView>
  );
};

export default Participants;
