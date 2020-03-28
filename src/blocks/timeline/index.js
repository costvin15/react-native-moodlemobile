import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Provider from './provider';

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Provider.getActionsEventsByTimesort().then(data => setEvents(data.events));
  }, []);

  return (
    <View>
      <Text>Timeline</Text>
      {events.map(event => (
        <View key={event.id}>
          <Text>{event.name}</Text>
          <Text>Curso: {event.course.fullname}</Text>
          <Text>
            {new Date(event.timestart * 1000).toLocaleString('pt-BR')}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Timeline;
