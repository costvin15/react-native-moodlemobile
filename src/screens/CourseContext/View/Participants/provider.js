import {callMoodleWebService} from '../../../../api/helper';
import i18n from 'react-native-i18n';
import Moment from 'moment';
import 'moment/locale/pt-br';

export const getParticipants = async courseid => {
  const locale = i18n.currentLocale();
  Moment.locale(locale);
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
