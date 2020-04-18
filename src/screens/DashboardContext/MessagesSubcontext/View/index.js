import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {GiftedChat} from 'react-native-gifted-chat';

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
      (async () => {
        setTitle(data.name);

        const resultMembers = [];
        data.members.forEach(member => {
          resultMembers.push({
            _id: member.id,
            name: member.fullname,
            avatar: member.profileimageurl,
          });
        });
        const currentUser = await Provider.getCurrentUser();
        resultMembers.push({
          _id: currentUser.userid,
          name: currentUser.fullname,
          avatar: currentUser.userpictureurl,
        });
        setMembers(resultMembers);

        const resultMessages = [];
        data.messages.forEach(({text, timecreated, useridfrom}, index) => {
          resultMessages.push({
            _id: index,
            text,
            createdAt: new Date(timecreated * 1000),
            user: resultMembers.find(({_id}) => _id === useridfrom),
          });
        });
        setMessages(resultMessages);
      })();
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
