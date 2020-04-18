import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text} from 'react-native';

const ConversationView = ({navigation}) => {
  const [conversation, setConversation] = useState({});

  const messages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ];

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
        hasScrolView: false,
      }}>
      <GiftedChat
        messages={messages}
        onSend={() => console.log('Send!')}
        user={{
          _id: 1,
        }}
      />
    </Page>
  );
};

export default ConversationView;
