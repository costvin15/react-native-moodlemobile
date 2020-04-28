import React from 'react';
import {View} from 'react-native';
// TODO: Replace material-ui with paper
// import {Card, Subheader} from 'react-native-material-ui';
import {Card} from 'react-native-paper';
import {styles} from './styles';

const Timeline = ({title}) => {
  return (
    <View>
      <Card
        style={{
          ...styles.marginHorizontalDefault,
          ...styles.marginVerticalDefault,
        }}>
        <Card.Title subtitle={'O bloco ' + title + ' não está implementado.'} />
      </Card>
    </View>
  );
};

export default Timeline;
