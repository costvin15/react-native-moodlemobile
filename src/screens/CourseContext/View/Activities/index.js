import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import Provider from './provider';
import Accordion from 'react-native-collapsible/Accordion';

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
      <View>
        <Text>{section.name}</Text>
      </View>
    );
  };

  const _renderContent = (section, index) => {
    return (
      <View>
        <FlatList
          data={sections[index].modules}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const _updateSections = actives => {
    setActiveSections(actives);
  };

  return (
    <View>
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderSectionTitle={() => <></>}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
    </View>
  );
};

export default Activities;
