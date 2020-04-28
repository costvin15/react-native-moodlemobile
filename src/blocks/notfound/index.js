import React from 'react';
import {View} from 'react-native';
// TODO: Replace material-ui with paper
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
