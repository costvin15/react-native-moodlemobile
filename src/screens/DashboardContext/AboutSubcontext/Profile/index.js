import React from 'react';
import {Page} from '../../../../components';
import {View} from 'react-native';

const Profile = ({navigation}) => {
  return (
    <Page
      appbar={{
        title: 'Perfil',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}>
      <View />
    </Page>
  );
};

export default Profile;
