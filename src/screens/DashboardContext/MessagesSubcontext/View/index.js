import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text} from 'react-native';

const ConversationView = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  // const messages = [
  //   {
  //     _id: 1,
  //     text: 'Hello developer',
  //     createdAt: new Date(),
  //     user: {
  //       _id: 2,
  //       name: 'React Native',
  //       avatar: 'https://placeimg.com/140/140/any',
  //     },
  //   },
  // ];

  useEffect(() => {
    Provider.getConversationMessages().then(data => {
      setTitle(data.name);

      const resultMessages = [];
      data.messages.forEach(({text, timecreated}, index) => {
        resultMessages.push({
          _id: index,
          text,
          createdAt: new Date(timecreated * 1000),
          user: {_id: 2, name: 'ReactNative'},
        });
      });
      setMessages(resultMessages);
    });
  }, []);

  return (
    <Page
      appbar={{
        title: title,
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
