import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {Bar} from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Provider from './provider';
import {styles} from './styles';
import {emmitEvent} from '../../api/helper';
import {Card} from 'react-native-paper';

const MyOverview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Provider.getCourseWithCompletionStatus().then(data => setCourses(data));
  }, []);

  return (
    <View>
      <Card
        style={{
          ...styles.marginVerticalDefault,
          ...styles.marginHorizontalDefault,
        }}>
        <Card.Title title="Resumo dos cursos" />
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
