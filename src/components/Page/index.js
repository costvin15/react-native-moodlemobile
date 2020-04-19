import React from 'react';
import {View, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import {styles} from './styles';

const Page = ({appbar, children, hasScrollView = true}) => {
  return (
    <View style={styles.flex}>
      <Appbar.Header style={{...styles.toolbar}}>
        {appbar?.canGoBack && <Appbar.BackAction onPress={appbar?.goBack} />}
        <Appbar.Content title={appbar?.title} />
      </Appbar.Header>

      {hasScrollView && (
        <ScrollView contentContainerStyle={styles.flexGrow}>
          {children}
        </ScrollView>
      )}
    </View>
  );
};

export default Page;
