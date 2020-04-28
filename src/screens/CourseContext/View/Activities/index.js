import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, ScrollView, Image} from 'react-native';
import Provider from './provider';
import Accordion from 'react-native-collapsible/Accordion';
import {styles} from './styles';
import {Card, IconButton} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {emmitEvent} from '../../../../api/helper';

const Activities = ({route}) => {
  const [sections, setSections] = useState([]);
  const [activeSections, setActiveSections] = useState([0]);

  useEffect(() => {
    Provider.getSectionAndActivities(route.params.id).then(data =>
      setSections(data),
    );
  }, [route.params.id]);

  const _renderHeader = (section, index, isActive) => {
    return (
      <Card
        style={{
          ...styles.marginHorizontal,
          ...styles.marginTop,
          ...(isActive ? styles.cardHeader : {}),
        }}>
        <Card.Title
          title={section.name}
          right={props =>
            isActive ? (
              <IconButton
                {...props}
                icon="arrow-up-drop-circle-outline"
                onPress={() => {}}
              />
            ) : (
              <IconButton
                {...props}
                icon="arrow-down-drop-circle-outline"
                onPress={() => {}}
              />
            )
          }
        />
      </Card>
    );
  };

  const _renderActivity = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          emmitEvent('core.course.activity.view', {item});
        }}>
        <View style={styles.rowDirection}>
          <View style={styles.rowDirection}>
            {item.modicontype !== 'image/svg+xml' && (
              <Image
                source={{uri: item.modicon}}
                style={{width: 25, height: 25}}
              />
            )}
            <Text>{item.name}</Text>
          </View>

          <IconButton icon="link" />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderContent = (section, index, isActive) => {
    return (
      <Card
        style={{
          ...styles.marginHorizontal,
          ...(isActive ? styles.cardContent : {}),
        }}>
        <FlatList
          style={{...styles.marginHorizontal, ...styles.marginVertical}}
          data={sections[index].modules}
          renderItem={_renderActivity}
        />
      </Card>
    );
  };

  const _updateSections = actives => {
    setActiveSections(actives);
  };

  return (
    <ScrollView>
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderSectionTitle={() => <></>}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        touchableComponent={props => <TouchableOpacity {...props} />}
      />
    </ScrollView>
  );
};

export default Activities;
