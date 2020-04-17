import {callMoodleWebService} from '../../../../api/helper';

export const getSectionAndActivities = async courseid => {
  const response = await callMoodleWebService('core_course_get_contents', {
    courseid,
  });
  return response;
};

export default {getSectionAndActivities};
