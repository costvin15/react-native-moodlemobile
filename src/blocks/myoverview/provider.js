import {
  callMoodleWebService,
  getUserCourses,
  getCurrentUserDetails,
} from '../../api/helper';
import Constants from '../../api/constants';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const getImage = async url => {
  if (typeof url !== 'undefined') {
    const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', url + '?token=' + token);
    return response.path();
  }

  return null;
};

export const getCourseWithCompletionStatus = async () => {
  const coursesWithExtraFields = [];
  const courses = await getUserCourses();

  for (const course of courses) {
    let activities_completed = 0;
    const {userid} = await getCurrentUserDetails();
    const {statuses} = await callMoodleWebService(
      'core_completion_get_activities_completion_status',
      {
        wstoken: Constants.MOODLE_ADMIN_TOKEN,
        userid: userid,
        courseid: course.id,
      },
    );

    const {courses} = await callMoodleWebService(
      'core_course_get_courses_by_field',
      {
        field: 'id',
        value: course.id,
      },
    );

    courses[0].image = await getImage(courses[0].overviewfiles[0]?.fileurl);
    statuses.map(({state}) => state && activities_completed++);
    course.completion = statuses;
    course.percentage = (activities_completed / statuses.length) * 100;
    coursesWithExtraFields.push(Object.assign(course, courses[0]));
  }

  return coursesWithExtraFields;
};

export default {getCourseWithCompletionStatus};
