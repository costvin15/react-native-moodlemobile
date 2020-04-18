import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {GiftedChat} from 'react-native-gifted-chat';
import {emmitEvent} from '../../../../api/helper';

const ConversationView = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [messages, setMessages] = useState([]);

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
        setCurrentUser(currentUser);
        resultMembers.push({
          _id: currentUser.userid,
          name: currentUser.fullname,
          avatar: currentUser.userpictureurl,
        });

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
          _id: currentUser.userid,
        }}
        // TODO: Call core.user.view instead of core.user details
        onPressAvatar={user => emmitEvent('core.user.details', {id: user._id})}
      />
    </Page>
  );
};

export default ConversationView;
