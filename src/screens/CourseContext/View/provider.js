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

export default {getCourseDetail};
