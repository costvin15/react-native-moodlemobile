import AsyncStorage from '@react-native-community/async-storage';
import Constants from './constants';
import events from '../events';

export const callMoodleWebService = async (wsfunction, ...params) => {
  var url = `${
    Constants.MOODLE_HOST
  }/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${wsfunction}`;

  if (typeof params.wstoken === 'undefined') {
    const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
    if (token) {
      url += `&wstoken=${token}`;
    }
  }

  params.forEach(param => {
    Object.keys(param).forEach(key => {
      url += `&${key}=${param[key]}`;
    });
  });

  const response = await fetch(url);
  const data = await response.json();

  if (data.errorcode) {
    throw data;
  }

  return data;
};

export const updateCurrentUserDetails = async () => {
  const {sitename, functions, ...userdata} = await callMoodleWebService(
    'core_webservice_get_site_info',
  );

  await AsyncStorage.setItem(
    Constants.MOODLE_USER_DETAILS,
    JSON.stringify(userdata),
  );
};

export const getCurrentUserDetails = async () => {
  const userdata = await AsyncStorage.getItem(Constants.MOODLE_USER_DETAILS);
  return JSON.parse(userdata);
};

export const getUserCourses = async () => {
  const {userid} = await getCurrentUserDetails();
  const response = await callMoodleWebService('core_enrol_get_users_courses', {
    userid,
  });
  return response;
};

export const renewMoodleUserToken = async ({username, password}) => {
  const response = await fetch(
    `${Constants.MOODLE_HOST}/login/token.php?service=${
      Constants.MOODLE_SERVICE
    }&username=${username}&password=${password}`,
  );
  const data = await response.json();

  if (data.errorcode) {
    throw data;
  }

  await AsyncStorage.setItem(Constants.MOODLE_USER_TOKEN, data.token);
  await updateCurrentUserDetails();

  return data.token;
};

export const emmitEvent = (eventname, params) => {
  const {handler} = events.find(event => event?.name === eventname);
  handler(params);
};
