import React, {useState, useEffect} from 'react';
import {Card, ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import i18n from 'react-native-i18n';

import Provider from './provider';
import {styles} from './styles';
import {emmitEvent} from '../../api/helper';

const MyOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Provider.getCourseWithCompletionStatus().then(data => {
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
        <Card.Title title={i18n.t('myoverview')} />
        {(isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row">
              <SkeletonPlaceholder.Item
                width={300}
                marginLeft={15}
                marginRight={15}
                marginBottom={15}>
                <SkeletonPlaceholder.Item height={170} />
                <SkeletonPlaceholder.Item height={32} marginTop={10} />
                <SkeletonPlaceholder.Item height={12} marginTop={10} />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                width={300}
                marginLeft={15}
                marginRight={15}
                marginBottom={15}>
                <SkeletonPlaceholder.Item height={170} />
                <SkeletonPlaceholder.Item height={32} marginTop={10} />
                <SkeletonPlaceholder.Item height={12} marginTop={10} />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                width={300}
                marginLeft={15}
                marginRight={15}
                marginBottom={15}>
                <SkeletonPlaceholder.Item height={170} />
                <SkeletonPlaceholder.Item height={32} marginTop={10} />
                <SkeletonPlaceholder.Item height={12} marginTop={10} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
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
                      <ProgressBar
                        style={{...styles.marginTopDefault}}
                        progress={item.percentage / 100}
                        width={280}
                      />
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
                <Text>Você está matriculado em nenhum curso.</Text>
              </View>
            )}
          </>
        )}
      </Card>
    </View>
  );
};

export default MyOverview;
