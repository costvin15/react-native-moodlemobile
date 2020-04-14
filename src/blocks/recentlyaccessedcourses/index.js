import React, {useState, useEffect} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import {Card, Subheader} from 'react-native-material-ui';
import Provider from './provider';
import Styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {emmitEvent} from '../../api/helper';

const RecentlyAccessedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Provider.getRecentlyAccessedCourses().then(data => setCourses(data));
  }, []);

  return (
    <View>
      <Card>
        <Subheader text="Cursos acessados recentemente" />
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
      </Card>
    </View>
  );
};

export default RecentlyAccessedCourses;
