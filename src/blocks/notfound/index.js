import React from 'react';
import {View} from 'react-native';
import {Card, Subheader} from 'react-native-material-ui';

const Timeline = ({title}) => {
  return (
    <View>
      <Card>
        <Subheader text={'O bloco ' + title + ' não está implementado.'} />
      </Card>
    </View>
  );
};

export default Timeline;
