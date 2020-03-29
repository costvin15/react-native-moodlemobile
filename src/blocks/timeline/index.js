import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Subheader, Card, Divider} from 'react-native-material-ui';
import Provider from './provider';
import Styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Provider.getActionsEventsByTimesort().then(data => setEvents(data.events));
  }, []);

  return (
    <View>
      <Card>
        <Subheader text="Timeline" />
        <Divider />

        {events.map(event => (
          <View style={Styles.eventContainer} key={event.id}>
            <Text style={Styles.eventTitle}>{event.name}</Text>
            <Text style={Styles.eventCourseTitle}>{event.course.fullname}</Text>
            <Text>
              {new Date(event.timestart * 1000).toLocaleString('pt-BR')}
            </Text>
            <Divider style={{container: Styles.eventDivider}} />
          </View>
        ))}

        {events.length === 0 && (
          <View style={Styles.noEventsContainer}>
            <MaterialIcons name="event-busy" size={40} />
            <Text>Você não tem tarefas</Text>
          </View>
        )}
      </Card>
    </View>
  );
};

export default Timeline;
