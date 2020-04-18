import React, {useEffect, useState} from 'react';
import Provider from './provider';
import {Page} from '../../../components';

const Dashboard = ({navigation, route}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    Provider.getConversations().then(data => setConversations(data));
  }, [navigation]);

  return (
    <Page appbar={{title: 'Mensagens'}}>
      {/*
      {conversations.map((conversation, index) => {
        return (
          <View key={index}>
            {conversation?.members.map(member => (
              <Text>{member.fullname}</Text>
            ))}
            {conversation.messages.map(message => (
              <Text>{message.text}</Text>
            ))}
          </View>
        );
      })} */}
    </Page>
  );
};

export default Dashboard;
