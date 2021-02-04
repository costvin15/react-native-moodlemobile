import React, {useEffect, useState} from 'react';
import Provider from './provider';
import {Page} from '../../../components';
import Accordion from 'react-native-collapsible/Accordion';
import {View, TouchableOpacity} from 'react-native';
import {Card, IconButton, Avatar} from 'react-native-paper';
import {styles} from './styles';
import {emmitEvent} from '../../../api/helper';
import Locales from '../../../locales';

const Dashboard = ({navigation, route}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [privateConversations, setPrivateConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);
  const [favouriteConversations, setFavouriteConversations] = useState([]);

  const sections = [
    {
      title: `${Locales.t('favorites')} (${favouriteConversations.length})`,
    },
    {
      title: `${Locales.t('group')} (${groupConversations.length})`,
    },
    {
      title: `${Locales.t('private')} (${privateConversations.length})`,
    },
  ];

  const renderHeader = (section, _, isActive) => (
    // TODO: Improve with react-native-animatable
    <Card
      style={
        isActive
          ? {...styles.headerActive, ...styles.removeBorderRadiusBottom}
          : styles.headerUnactive
      }>
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

  const RenderConversation = ({id = 0, image = '', title, date = 0}) => {
    const currentDate = new Date(date * 1000).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return (
      <TouchableOpacity
        onPress={() => emmitEvent('core.user.message.send', {id})}>
        <Card style={{...styles.removeBorderRadiusTop}}>
          <Card.Title
            title={title}
            titleStyle={{...styles.conversationTitle}}
            subtitle={currentDate}
            left={props => <Avatar.Image {...props} source={{uri: image}} />}
          />
        </Card>
      </TouchableOpacity>
    );
  };

  const renderContent = (_, index, isActive) => {
    if (index === 0) {
      return (
        <View
          style={{
            ...styles.marginBottomDefault,
            ...(isActive ? styles.marginHorizontal : {}),
          }}>
          {favouriteConversations.map(value => (
            <RenderConversation
              key={value.id}
              id={value.id}
              image={value.members[0].profileimageurl}
              title={value.members[0].fullname}
              date={value.messages.lenght > 0 && value.messages[0].timecreated}
            />
          ))}
        </View>
      );
    } else if (index === 1) {
      return (
        <View
          style={{
            ...styles.marginBottomDefault,
            ...(isActive ? styles.marginHorizontal : {}),
          }}>
          {groupConversations.map(value => (
            <RenderConversation
              key={value.id}
              id={value.id}
              image={value.imageurl}
              title={value.name}
              date={value.messages[0].timecreated}
            />
          ))}
        </View>
      );
    } else if (index === 2) {
      return (
        <View
          style={{
            ...styles.marginBottomDefault,
            ...(isActive ? styles.marginHorizontal : {}),
          }}>
          {privateConversations?.map(value => (
            <RenderConversation
              key={value.id}
              id={value.id}
              image={value.members[0].profileimageurl}
              title={value.members[0].fullname}
              date={value.messages[0].timecreated}
            />
          ))}
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
    <Page
      appbar={{
        title: Locales.t('messages'),
        action: {
          icon: 'cog',
          onPress: () => {
            navigation.navigate('messagessubcontext', {
              screen: 'settings',
            });
          },
        },
      }}>
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
    </Page>
  );
};

export default Dashboard;
