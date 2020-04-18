import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {GiftedChat} from 'react-native-gifted-chat';
import {emmitEvent} from '../../../../api/helper';

const ConversationView = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Provider.getConversationMessages(route?.params?.id).then(data => {
      (async () => {
        if (data.name !== null) {
          setTitle(data.name);
        } else {
          setTitle(data.members[0].fullname);
        }

        const resultMembers = [];
        data.members.forEach(member => {
          resultMembers.push({
            _id: member.id,
            name: member.fullname,
            avatar: member.profileimageurl,
          });
        });
        const user = await Provider.getCurrentUser();
        setCurrentUser(user);
        resultMembers.push({
          _id: user.userid,
          name: user.fullname,
          avatar: user.userpictureurl,
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
  }, [route]);

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
