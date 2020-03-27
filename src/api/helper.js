import AsyncStorage from '@react-native-community/async-storage';
import Constants from './constants';

export const callMoodleWebService = async (wsfunction, ...params) => {
  const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
  var url = `${
    Constants.MOODLE_HOST
  }/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${token}&wsfunction=${wsfunction}`;

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

  return data.token;
};
