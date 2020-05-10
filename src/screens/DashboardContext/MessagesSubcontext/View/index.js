import React, {useState, useEffect} from 'react';
import {Page} from '../../../../components';
import Provider from './provider';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {emmitEvent} from '../../../../api/helper';
import {View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';

const ConversationView = ({navigation, route}) => {
  const [conversationId, setConversationId] = useState(null);
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const Theme = useTheme();

  useEffect(() => {
    const getConversationByConvid = async () => {
      const response = await Provider.getConversation(route?.params?.id).catch(
        error => console.error(error),
      );
      return response;
    };

    const getConversationWithUser = async () => {
      const response = await Provider.getConversationsBetweenUsers({
        otheruserid: route?.params?.touserid,
      }).catch(error => console.error(error));
      return response;
    };

    const getSelfConversation = async () => {
      const response = await Provider.getSelfConversation().catch(error =>
        console.error(error),
      );
      return response;
    };

    const wrapper = async () => {
      let response;
      if (route?.params.id) {
        response = await getConversationByConvid();
      } else if (route?.params.touserid === currentUser.userid) {
        response = await getSelfConversation();
      } else if (route?.params.touserid) {
        response = await getConversationWithUser();
      }

      if (response?.name !== null) {
        setTitle(response?.name);
      } else {
        setTitle(response?.members[0].fullname);
      }

      const resultMembers = [];
      response?.members.forEach(member => {
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
      response?.messages.forEach(({id, text, timecreated, useridfrom}) => {
        resultMessages.push({
          _id: id,
          text,
          createdAt: new Date(timecreated * 1000),
          user: resultMembers.find(({_id}) => _id === useridfrom),
        });
      });

      setMessages(resultMessages);
      setConversationId(response?.id);
    };

    if (currentUser.userid) {
      wrapper();
    }
  }, [route, currentUser]);

  useEffect(() => {
    (async () => {
      const user = await Provider.getCurrentUser().catch(error =>
        console.error(error),
      );
      setCurrentUser(user);
    })();
  }, []);

  const renderMessageText = ({currentMessage, ...props}) => {
    return (
      <View style={styles.marginHorizontalDefault}>
        <RenderHTML
          html={currentMessage.text}
          tagsStyles={{
            p: {...styles.whiteColor, ...styles.marginVerticalDefault},
          }}
        />
      </View>
    );
  };

  return (
    <Page
      appbar={{
        title: title,
        canGoBack: navigation.canGoBack(),
        goBack: navigation.goBack,
      }}
      hasScrollView={false}>
      <GiftedChat
        messages={messages}
        onSend={data => {
          (async () => {
            const response = await Provider.sendMessageToConversations({
              conversationId,
              data,
            });
            const message = {
              _id: response[0]?.id,
              text: response[0]?.text,
              createdAt: Date.now(),
              user: {
                _id: currentUser.userid,
                name: currentUser.fullname,
                avatar: currentUser.userpictureurl,
              },
            };
            setMessages(GiftedChat.append(messages, message));
          })();
        }}
        user={{
          _id: currentUser.userid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: '#3b3b3b',
                },
                right: {
                  backgroundColor: Theme.colors.primary,
                },
              }}
            />
          );
        }}
        renderMessageText={props => renderMessageText(props)}
        onPressAvatar={user => emmitEvent('core.user.view', {id: user._id})}
      />
    </Page>
  );
};

export default ConversationView;
