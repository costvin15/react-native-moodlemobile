import React, {useState, useEffect} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
// TODO: Replace material-ui with paper
import {Card, Subheader} from 'react-native-material-ui';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Provider from './provider';
import Styles from './styles';
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
      <Card>
        <Subheader text="Cursos acessados recentemente" />
        {(isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row">
              <SkeletonPlaceholder.Item width={300} margin={15}>
                <SkeletonPlaceholder.Item height={170} />
                <SkeletonPlaceholder.Item marginTop={10} height={32} />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item width={300} margin={15}>
                <SkeletonPlaceholder.Item height={170} />
                <SkeletonPlaceholder.Item marginTop={10} height={32} />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item width={300} margin={15}>
                <SkeletonPlaceholder.Item height={170} />
                <SkeletonPlaceholder.Item marginTop={10} height={32} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )) || (
          <FlatList
            style={Styles.coursesContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courses}
            keyExtractor={item => 'item-' + item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => emmitEvent('core.course.view', {id: item.id})}>
                <View
                  style={{
                    ...Styles.courseContainer,
                    ...(index !== courses.length - 1
                      ? Styles.courseItemMargin
                      : {}),
                  }}>
                  {(item.image && (
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={Styles.courseImage}
                    />
                  )) || (
                    <View
                      style={{...Styles.courseImage, ...Styles.courseNoImage}}>
                      <MaterialIcons name="image" size={50} />
                    </View>
                  )}
                  <View style={Styles.courseFooter}>
                    <Text style={Styles.courseTitle}>{item.displayname}</Text>
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
