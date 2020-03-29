import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Provider from './provider';

const Dashboard = ({navigation, route}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    Provider.getConversations().then(data => setConversations(data));
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>Messages</Text>
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
      })}
    </SafeAreaView>
  );
};

export default Dashboard;
