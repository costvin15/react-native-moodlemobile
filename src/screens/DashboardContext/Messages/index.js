import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Provider from './provider';

const Dashboard = ({navigation, route}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Mensagens',
      tabBarIcon: ({color}) => (
        <MaterialIcons name="chat" color={color} size={26} />
      ),
    });

    Provider.getConversations().then(data => setConversations(data));
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>Messages</Text>
      {conversations.map(conversation => {
        console.log(conversation);
        return (
          <View>
            {conversation.members.map(member => (
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
