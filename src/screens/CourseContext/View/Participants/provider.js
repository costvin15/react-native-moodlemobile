import {callMoodleWebService} from '../../../../api/helper';

export const getParticipants = async courseid => {
  const response = await callMoodleWebService('core_enrol_get_enrolled_users', {
    courseid,
  });
  return response;
};

export default {getParticipants};
