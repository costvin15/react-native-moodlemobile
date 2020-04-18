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
    const getConversationByConvid = async () => {
      try {
        const response = Provider.getConversation(route?.params?.id);
        return response;
      } catch (error) {
        console.log(error);
        console.error('Esta conversa não existe (18)');
      }
    };

    const getConversationWithUser = async () => {
      try {
        const response = await Provider.getConversationsBetweenUsers({
          otheruserid: route?.params?.touserid,
        });
        console.log(response);
        return response;
      } catch (error) {
        console.log(route?.params?.touserid);
        console.error('Esta conversa não existe (31)');
      }
    };

    const getSelfConversation = async () => {
      try {
        const response = await Provider.getSelfConversation();
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        console.error('Esta conversa não existe (43)');
      }
    };

    (async () => {
      let response;
      if (route?.params.id) {
        response = await getConversationByConvid();
      } else if (route?.params.touserid === currentUser.userid) {
        response = await getSelfConversation();
      } else if (route?.params.touserid && currentUser.userid) {
        response = await getConversationWithUser();
      }

      if (response?.name !== null) {
        setTitle(response.name);
      } else {
        setTitle(response.members[0].fullname);
      }

      const resultMembers = [];
      response.members.forEach(member => {
        resultMembers.push({
          _id: member.id,
          name: member.fullname,
          avatar: member.profileimageurl,
        });
      });

      resultMembers.push({
        _id: currentUser.userid,
        name: currentUser.fullname,
        avatar: currentUser.userpictureurl,
      });

      const resultMessages = [];
      response.messages.forEach(({text, timecreated, useridfrom}, index) => {
        resultMessages.push({
          _id: index,
          text,
          createdAt: new Date(timecreated * 1000),
          user: resultMembers.find(({_id}) => _id === useridfrom),
        });
      });

      setMessages(resultMessages);
    })();
  }, [route, currentUser]);

  useEffect(() => {
    (async () => {
      const user = await Provider.getCurrentUser();
      setCurrentUser(user);
    })();
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
