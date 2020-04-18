import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';

const View = ({navigation}) => {
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    Provider.getConversationMessages().then(data => {
      setConversation(data);
    });
  }, []);

  return (
    <Page
      appbar={{
        title: conversation?.name,
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}
    />
  );
};

export default View;
