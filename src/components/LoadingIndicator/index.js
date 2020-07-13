import React from 'react';
import {Modal, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {styles} from './styles';

const LoadingIndicator = ({hasActivity = false}) => (
  <View>
    <Modal transparent animationType="none" visible={hasActivity}>
      <View style={{...styles.flex, ...styles.center, ...styles.container}}>
        <View style={{...styles.center, ...styles.activityWrapper}}>
          <ActivityIndicator animating={hasActivity} />
        </View>
      </View>
    </Modal>
  </View>
);

export default LoadingIndicator;
