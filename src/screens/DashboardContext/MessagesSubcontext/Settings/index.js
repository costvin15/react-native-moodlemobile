import React from 'react';
import {Page} from '../../../../components';

const Settings = ({navigation}) => {
  return (
    <Page
      appbar={{
        title: 'Configurações',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}
    />
  );
};

export default Settings;
