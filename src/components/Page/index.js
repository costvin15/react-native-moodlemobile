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
        <Appbar.Action
          icon={appbar?.action?.icon}
          onPress={appbar?.action?.onPress}
        />
      </Appbar.Header>

      {(hasScrollView && (
        <ScrollView contentContainerStyle={styles.flexGrow}>
          {children}
        </ScrollView>
      )) || <>{children}</>}
    </View>
  );
};

export default Page;
