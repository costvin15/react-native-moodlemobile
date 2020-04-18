import React, {useEffect, useState} from 'react';
import Provider from './provider';
import {Page} from '../../../components';
import Accordion from 'react-native-collapsible/Accordion';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {styles} from './styles';

const Dashboard = ({navigation, route}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [privateConversations, setPrivateConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);
  const [favouriteConversations, setFavouriteConversations] = useState([]);

  const sections = [
    {
      title: `Favoritos (${favouriteConversations.length})`,
      content: 'Lorem ipsun...',
    },
    {
      title: `Grupo (${groupConversations.length})`,
      content: 'Lorem ipsun...',
    },
    {
      title: `Privado (${privateConversations.length})`,
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

  const renderConversation = ({members}) => {
    // TODO: Improve conversation view
    return <Text>{members[0].fullname}</Text>;
  };

  const renderContent = (section, index) => {
    if (index === 0) {
      return (
        <View>
          {favouriteConversations.map(value => renderConversation(value))}
        </View>
      );
    } else if (index === 1) {
      return (
        <View>
          {groupConversations.map(value => renderConversation(value))}
        </View>
      );
    } else if (index === 2) {
      return (
        <View>
          {privateConversations.map(value => renderConversation(value))}
        </View>
      );
    }
  };

  useEffect(() => {
    Provider.getPrivateConversations().then(data =>
      setPrivateConversations(data),
    );
    Provider.getGroupConversations().then(data => setGroupConversations(data));
    Provider.getFavouritesConversations().then(data =>
      setFavouriteConversations(data),
    );
  }, []);

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
