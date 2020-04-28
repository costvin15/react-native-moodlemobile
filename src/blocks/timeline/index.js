import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card, Divider, Button} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Provider from './provider';
import {styles} from './styles';

const Timeline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Provider.getActionsEventsByTimesort().then(data =>
      setEvents(data.events.slice(0, 3)),
    );
    setIsLoading(false);
  }, []);

  return (
    <View>
      <Card
        style={{
          ...styles.marginVerticalDefault,
          ...styles.marginHorizontalDefault,
        }}>
        <Card.Title title="Timeline" />

        {(isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item marginHorizontal={15} marginBottom={15}>
              <SkeletonPlaceholder.Item height={18} />
              <SkeletonPlaceholder.Item marginTop={10} height={24} />
              <SkeletonPlaceholder.Item
                marginTop={10}
                height={16}
                width={150}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item marginHorizontal={15} marginBottom={15}>
              <SkeletonPlaceholder.Item height={18} />
              <SkeletonPlaceholder.Item marginTop={10} height={24} />
              <SkeletonPlaceholder.Item
                marginTop={10}
                height={16}
                width={150}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item marginHorizontal={15} marginBottom={15}>
              <SkeletonPlaceholder.Item height={18} />
              <SkeletonPlaceholder.Item marginTop={10} height={24} />
              <SkeletonPlaceholder.Item
                marginTop={10}
                height={16}
                width={150}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )) || (
          <>
            {events.map(event => (
              <View key={event.id} style={{...styles.marginHorizontalDefault}}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                <Text style={styles.eventCourseTitle}>
                  {event.course.fullname}
                </Text>
                <Text>
                  {new Date(event.timestart * 1000).toLocaleString('pt-BR')}
                </Text>
                <Divider style={{...styles.marginVerticalDefault}} />
              </View>
            ))}

            {events.length === 0 && (
              <View style={styles.noEventsContainer}>
                <MaterialIcons name="event-busy" size={40} />
                <Text>Você não tem tarefas</Text>
              </View>
            )}
          </>
        )}

        <Card.Actions style={{...styles.justifyEnd}}>
          <Button onPress={() => {}}>
            Ver mais <MaterialIcons name="arrow-forward" />
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Timeline;
