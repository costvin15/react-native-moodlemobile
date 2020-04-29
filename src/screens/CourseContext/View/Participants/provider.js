import {callMoodleWebService} from '../../../../api/helper';
import Moment from 'moment';

export const getParticipants = async courseid => {
  Moment.locale();
  const response = await callMoodleWebService('core_enrol_get_enrolled_users', {
    courseid,
  });
  for (const participant of response) {
    if (participant.lastaccess !== 0) {
      const lastaccess = Moment(new Date(participant.lastaccess * 1000));
      const currentdate = Moment();
      const difference = currentdate.diff(lastaccess);
      const duration = Moment.duration(difference);
      participant.lastaccesstime = duration.humanize();
    }
  }

  return response;
};

export default {getParticipants};
