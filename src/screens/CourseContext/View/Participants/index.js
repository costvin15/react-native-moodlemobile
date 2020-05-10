import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import Provider from './provider';
import {styles} from './styles';
import {emmitEvent} from '../../../../api/helper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    <ScrollView>
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
          )) ||
            participants.map((item, index) => (
              <View key={index}>
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
                        ...styles.spaceBetween,
                      }}>
                      <View
                        style={{
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
                      <MaterialIcons name="keyboard-arrow-right" size={30} />
                    </View>
                  </View>
                </TouchableOpacity>
                {index !== participants.length - 1 && <Divider />}
              </View>
            ))}
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Participants;
