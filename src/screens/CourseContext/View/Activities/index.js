import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, ScrollView, Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Card, IconButton} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {emmitEvent} from '../../../../api/helper';
import Provider from './provider';
import {styles} from './styles';

const Activities = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [activeSections, setActiveSections] = useState([0]);

  useEffect(() => {
    Provider.getSectionAndActivities(route.params.id).then(data => {
      setSections(data);
      setIsLoading(false);
    });
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
        key={item.id}
        onPress={() => {
          emmitEvent('core.module.view', {item, courseid: route.params.id});
        }}>
        <View
          style={{
            ...styles.rowDirection,
            ...styles.alignCenter,
          }}>
          {item.modicontype !== 'image/svg+xml' && (
            <Image
              source={{uri: item.modicon}}
              style={{
                ...styles.modIcon,
                ...styles.marginLeft,
              }}
            />
          )}
          <Text
            style={{
              ...styles.marginHorizontal,
              ...styles.flex,
            }}>
            {item.name}
          </Text>
          <IconButton
            style={{
              ...styles.marginRight,
            }}
            icon="link"
          />
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
        {sections[index].modules.map(module => (
          <_renderActivity key={module.id} item={module} />
        ))}
      </Card>
    );
  };

  const _updateSections = actives => {
    setActiveSections(actives);
  };

  if (isLoading) {
    return (
      <View>
        <Card
          style={{
            ...styles.marginHorizontal,
            ...styles.marginTop,
          }}>
          <View
            style={{
              ...styles.marginHorizontal,
              ...styles.marginVertical,
            }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={24} />
              <SkeletonPlaceholder.Item height={12} marginTop={15} />
              <SkeletonPlaceholder.Item height={12} marginTop={5} />
            </SkeletonPlaceholder>
          </View>
        </Card>

        <Card
          style={{
            ...styles.marginHorizontal,
            ...styles.marginTop,
          }}>
          <View
            style={{
              ...styles.marginHorizontal,
              ...styles.marginVertical,
            }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={24} />
            </SkeletonPlaceholder>
          </View>
        </Card>

        <Card
          style={{
            ...styles.marginHorizontal,
            ...styles.marginTop,
          }}>
          <View
            style={{
              ...styles.marginHorizontal,
              ...styles.marginVertical,
            }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={24} />
            </SkeletonPlaceholder>
          </View>
        </Card>

        <Card
          style={{
            ...styles.marginHorizontal,
            ...styles.marginTop,
          }}>
          <View
            style={{
              ...styles.marginHorizontal,
              ...styles.marginVertical,
            }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={24} />
            </SkeletonPlaceholder>
          </View>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.flexGrow}>
        <SafeAreaView>
          <Accordion
            sections={sections}
            activeSections={activeSections}
            renderSectionTitle={() => <></>}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            touchableComponent={props => <TouchableOpacity {...props} />}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Activities;
