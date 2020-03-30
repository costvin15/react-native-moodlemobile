import React, {useState, useEffect} from 'react';
import {FlatList, View, Image, Text} from 'react-native';
import {Card, Subheader} from 'react-native-material-ui';
import Provider from './provider';
import Styles from './styles';

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
          data={courses}
          renderItem={({item}) => (
            <View key={item.id}>
              {item.image && (
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={Styles.courseImage}
                />
              )}
              <Text>{item.displayname}</Text>
            </View>
          )}
        />
      </Card>
    </View>
  );
};

export default RecentlyAccessedCourses;
