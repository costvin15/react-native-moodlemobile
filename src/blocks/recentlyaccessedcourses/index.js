import React, {useState, useEffect} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Card} from 'react-native-paper';

import Provider from './provider';
import {styles} from './styles';
import {emmitEvent} from '../../api/helper';
import Locales from '../../locales';

const RecentlyAccessedCourses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Provider.getRecentlyAccessedCourses().then(data => {
      setCourses(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <View>
      <Card
        style={{
          ...styles.marginVerticalDefault,
          ...styles.marginHorizontalDefault,
          ...styles.overflowHidden,
        }}>
        <Card.Title title={Locales.t('recentlyaccessedcourses')} />
        {(isLoading && (
          <View>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item
                  width={300}
                  marginLeft={15}
                  marginRight={15}
                  marginBottom={15}>
                  <SkeletonPlaceholder.Item height={170} />
                  <SkeletonPlaceholder.Item marginTop={10} height={32} />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  width={300}
                  marginLeft={15}
                  marginRight={15}
                  marginBottom={15}>
                  <SkeletonPlaceholder.Item height={170} />
                  <SkeletonPlaceholder.Item marginTop={10} height={32} />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  width={300}
                  marginLeft={15}
                  marginRight={15}
                  marginBottom={15}>
                  <SkeletonPlaceholder.Item height={170} />
                  <SkeletonPlaceholder.Item marginTop={10} height={32} />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )) || (
          <>
            <FlatList
              style={{...styles.marginBottomDefault}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={courses}
              keyExtractor={item => 'item-' + item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => emmitEvent('core.course.view', {id: item.id})}>
                  <View
                    style={{
                      ...styles.courseContainer,
                      ...styles.marginLeftDefault,
                      ...(index === courses.length - 1
                        ? styles.marginRightDefault
                        : {}),
                    }}>
                    {(item.image && (
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        style={styles.courseImage}
                      />
                    )) || (
                      <View
                        style={{
                          ...styles.courseImage,
                          ...styles.courseNoImage,
                        }}>
                        <MaterialIcons name="image" size={50} />
                      </View>
                    )}
                    <View style={styles.courseFooter}>
                      <Text style={styles.courseTitle}>{item.displayname}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />

            {courses.length === 0 && (
              <View
                style={{
                  ...styles.marginBottomDefault,
                  ...styles.paddingVerticalDefault,
                  ...styles.paddingHorizontalDefault,
                  ...styles.alignItemsCenter,
                }}>
                <MaterialIcons name="sentiment-dissatisfied" size={40} />
                <Text>Você não acessou nenhum curso recentemente</Text>
              </View>
            )}
          </>
        )}
      </Card>
    </View>
  );
};

export default RecentlyAccessedCourses;
