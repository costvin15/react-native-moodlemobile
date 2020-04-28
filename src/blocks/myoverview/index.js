import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
// TODO: Replace material-ui with paper
import {Card, Subheader} from 'react-native-material-ui';
import Provider from './provider';
import Styles from './styles';
import {Bar} from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {emmitEvent} from '../../api/helper';

const MyOverview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Provider.getCourseWithCompletionStatus().then(data => setCourses(data));
  }, []);

  return (
    <View>
      <Card>
        <Subheader text="Resumo dos cursos" />
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
                  <Bar progress={item.percentage / 100} width={280} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </Card>
    </View>
  );
};

export default MyOverview;
