import {callMoodleWebService} from '../../../api/helper';

export const getCourseDetail = async id => {
  const {courses} = await callMoodleWebService(
    'core_course_get_courses_by_field',
    {
      field: 'id',
      value: id,
    },
  );
  return courses[0];
};

export const logCourseWasViewed = async id => {
  const {status} = await callMoodleWebService('core_course_view_course', {
    courseid: id,
  });
  return status;
};

export default {getCourseDetail, logCourseWasViewed};
