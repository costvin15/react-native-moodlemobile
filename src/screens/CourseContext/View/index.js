import React, {useState, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import Provider from './provider';
import Activities from './Activities';
import Participants from './Participants';
import {useTheme} from 'react-native-paper';
import Locales from '../../../locales';

const Course = ({navigation, route}) => {
  const [course, setCourse] = useState({
    displayname: 'Curso',
  });
  const Tab = createMaterialTopTabNavigator();
  const Theme = useTheme();

  useEffect(() => {
    Provider.getCourseDetail(route.params.id).then(data => setCourse(data));
  }, [route.params.id]);

  return (
    <Tab.Navigator
      tabBar={props => (
        <>
          <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={course.displayname} />
          </Appbar.Header>
          <MaterialTopTabBar
            {...props}
            style={{
              backgroundColor: Theme.colors.primary,
            }}
            activeTintColor="#fff"
          />
        </>
      )}
      headerMode="none"
      initialRouteName="view">
      <Tab.Screen
        name={Locales.t('activities')}
        component={Activities}
        initialParams={route.params}
      />
      <Tab.Screen
        name={Locales.t('participants')}
        component={Participants}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default Course;
