import React from 'react';
import {Page} from '../../../../components';

const View = ({navigation}) => {
  return (
    <Page
      appbar={{
        title: 'Mensagens',
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}
    />
  );
};

export default View;
