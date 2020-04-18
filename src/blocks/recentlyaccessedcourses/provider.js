import {callMoodleWebService, getUserCourses} from '../../api/helper';
import Constants from '../../api/constants';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

export const getImage = async url => {
  if (typeof url !== 'undefined') {
    const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', url + '?token=' + token);
    return response.path();
  }

  return null;
};

export const getRecentlyAccessedCourses = async () => {
  const coursesWithExtraFields = [];
  const courses = await getUserCourses();

  for (const course of courses) {
    const {courses} = await callMoodleWebService(
      'core_course_get_courses_by_field',
      {
        field: 'id',
        value: course.id,
      },
    );

    courses[0].image = await getImage(courses[0].overviewfiles[0]?.fileurl);

    coursesWithExtraFields.push(Object.assign(course, courses[0]));
  }

  coursesWithExtraFields.sort((a, b) => {
    if (a.lastaccess > b.lastaccess) {
      return -1;
    } else if (a.lastaccess < b.lastaccess) {
      return 1;
    } else {
      return 0;
    }
  });

  return coursesWithExtraFields;
};

export default {getImage, getRecentlyAccessedCourses};
