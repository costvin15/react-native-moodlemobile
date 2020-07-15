import React, {useState, useEffect} from 'react';
import {emmitEvent} from '../../../../api/helper';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';

import {Page} from '../../../../components';
import Provider from './provider';
import {styles} from './styles';
import Locales from '../../../../locales';

const Grades = ({navigation}) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    Provider.getGrades().then(data => setGrades(data));
  }, []);

  return (
    <Page
      appbar={{
        title: Locales.t('grades'),
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View>
        {grades.map(({course, courseid, totalgrade}, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              emmitEvent('core.course.grade.view', {id: courseid})
            }>
            <Card
              style={{
                ...styles.marginHorizontalDefault,
                ...styles.marginTopDefault,
                ...styles.paddingHorizontalDefault,
                ...styles.paddingVerticalDefault,
              }}>
              <View
                style={{...styles.rowDirection, ...styles.justifySpaceBetween}}>
                <Text style={{...styles.gradeTitleStyle}}>{course}</Text>

                <View style={{...styles.gradeTextStyle}}>
                  <Text style={{...styles.whiteColor}}>{totalgrade}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </Page>
  );
};

export default Grades;
