import React, {useState, useEffect} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Card} from 'react-native-paper';

import Provider from './provider';
import {styles} from './styles';
import {emmitEvent} from '../../api/helper';

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
        }}>
        <Card.Title title="Cursos acessados recentemente" />
        {(isLoading && (
          <View>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item width={300} margin={15}>
                  <SkeletonPlaceholder.Item height={170} />
                  <SkeletonPlaceholder.Item marginTop={10} height={32} />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )) || (
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
                      style={{...styles.courseImage, ...styles.courseNoImage}}>
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
        )}
      </Card>
    </View>
  );
};

export default RecentlyAccessedCourses;
