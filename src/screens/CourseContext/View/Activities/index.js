import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, ScrollView} from 'react-native';
import Provider from './provider';
import Accordion from 'react-native-collapsible/Accordion';
import {styles} from './styles';
import {Card} from 'react-native-paper';

const Activities = ({route}) => {
  const [sections, setSections] = useState([]);
  const [activeSections, setActiveSections] = useState([0]);

  useEffect(() => {
    Provider.getSectionAndActivities(route.params.id).then(data =>
      setSections(data),
    );
  }, [route.params.id]);

  const _renderHeader = section => {
    return (
      <Card
        style={{
          ...styles.marginHorizontal,
          ...styles.marginTop,
          ...styles.cardHeader,
        }}>
        <Card.Title title={section.name} />
      </Card>
    );
  };

  const _renderContent = (section, index) => {
    return (
      <Card style={{...styles.marginHorizontal, ...styles.cardContent}}>
        <FlatList
          style={{...styles.marginHorizontal, ...styles.marginVertical}}
          data={sections[index].modules}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
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
      />
    </ScrollView>
  );
};

export default Activities;
