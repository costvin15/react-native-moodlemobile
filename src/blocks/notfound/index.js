import React from 'react';
import {styles} from './styles';
import {View} from 'react-native';
import {Card} from 'react-native-paper';

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
