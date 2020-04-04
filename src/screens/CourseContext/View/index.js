import React, {useState, useEffect} from 'react';
import {View as RNView} from 'react-native';
import {Appbar} from 'react-native-paper';
import {styles} from './styles';
import Provider from './provider';

const View = ({navigation, route}) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    Provider.getCourseDetail(route.params.id).then(data => setCourse(data));
  }, [route.params.id]);

  return (
    <RNView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={course.displayname} />
      </Appbar.Header>
    </RNView>
  );
};

export default View;
