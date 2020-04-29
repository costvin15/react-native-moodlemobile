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
import {emmitEvent} from '../../../../api/helper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Participants = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    Provider.getParticipants(route.params.id).then(data => {
      setParticipants(data);
      setIsLoading(false);
    });
  }, [route.params.id]);

  return (
    <SafeAreaView>
      <Card
        style={{
          ...styles.marginTopDefault,
          ...styles.marginBottomDefault,
          ...styles.marginHorizontalDefault,
        }}>
        {(isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              padding={15}
              alignItems="center">
              <SkeletonPlaceholder.Item width={50} height={50} />
              <SkeletonPlaceholder.Item
                flexDirection="column"
                flexGrow={1}
                marginLeft={15}>
                <SkeletonPlaceholder.Item height={14} />
                <SkeletonPlaceholder.Item height={14} marginTop={5} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item
              flexDirection="row"
              padding={15}
              paddingTop={0}
              alignItems="center">
              <SkeletonPlaceholder.Item width={50} height={50} />
              <SkeletonPlaceholder.Item
                flexDirection="column"
                flexGrow={1}
                marginLeft={15}>
                <SkeletonPlaceholder.Item height={14} />
                <SkeletonPlaceholder.Item height={14} marginTop={5} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item
              flexDirection="row"
              padding={15}
              paddingTop={0}
              alignItems="center">
              <SkeletonPlaceholder.Item width={50} height={50} />
              <SkeletonPlaceholder.Item
                flexDirection="column"
                flexGrow={1}
                marginLeft={15}>
                <SkeletonPlaceholder.Item height={14} />
                <SkeletonPlaceholder.Item height={14} marginTop={5} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )) || (
          <FlatList
            data={participants}
            keyExtractor={item => item.id}
            renderItem={({index, item}) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    emmitEvent('core.user.view', {id: item.id});
                  }}>
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
        )}
      </Card>
    </SafeAreaView>
  );
};

export default Participants;
