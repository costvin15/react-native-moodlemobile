import React, {useEffect, useState} from 'react';
import Provider from './provider';
import {Page} from '../../../components';
import Accordion from 'react-native-collapsible/Accordion';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {styles} from './styles';

const Dashboard = ({navigation, route}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [conversations, setConversations] = useState([]);

  const sections = [
    {
      title: 'Favoritos',
      content: 'Lorem ipsun...',
    },
    {
      title: 'Grupo',
      content: 'Lorem ipsun...',
    },
    {
      title: 'Privado',
      content: 'Lorem ipsun...',
    },
  ];

  const renderHeader = (section, index, isActive) => (
    // TODO: Improve with react-native-animatable
    <Card style={isActive ? styles.headerActive : styles.headerUnactive}>
      <Card.Title
        title={section.title}
        right={props => (
          <IconButton
            {...props}
            icon={isActive ? 'chevron-up' : 'chevron-down'}
          />
        )}
      />
    </Card>
  );

  const renderContent = () => <Text>Content</Text>;

  useEffect(() => {
    Provider.getConversations().then(data => setConversations(data));
  }, [navigation]);

  return (
    <Page appbar={{title: 'Mensagens'}}>
      <View>
        <Accordion
          activeSections={activeSections}
          sections={sections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={data => setActiveSections(data)}
          touchableComponent={props => <TouchableOpacity {...props} />}
        />
      </View>
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
