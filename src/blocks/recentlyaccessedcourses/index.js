import React from 'react';
import {View} from 'react-native';
import {Card, Subheader} from 'react-native-material-ui';

const RecentlyAccessedCourses = () => {
  return (
    <View>
      <Card>
        <Subheader text="Cursos acessados recentemente" />
      </Card>
    </View>
  );
};

export default RecentlyAccessedCourses;
