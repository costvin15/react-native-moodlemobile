import React, {useState, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import Provider from './provider';
import {styles} from './styles';
import Activities from './Activities';
import Participants from './Participants';

const Course = ({navigation, route}) => {
  const [course, setCourse] = useState({});
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    Provider.getCourseDetail(route.params.id).then(data => setCourse(data));
  }, [route.params.id]);

  return (
    <Tab.Navigator
      tabBar={props => (
        <>
          <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={course.displayname} />
          </Appbar.Header>
          <MaterialTopTabBar
            {...props}
            style={styles.tabbar}
            activeTintColor="#fff"
          />
        </>
      )}
      headerMode="none"
      initialRouteName="view">
      <Tab.Screen
        name="activities"
        component={Activities}
        initialParams={route.params}
      />
      <Tab.Screen
        name="participants"
        component={Participants}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default Course;
