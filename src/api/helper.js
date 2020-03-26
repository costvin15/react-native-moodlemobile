import AsyncStorage from '@react-native-community/async-storage';
import Constants from './constants';

export const callMoodleWebService = async (wsfunction, {...params}) => {
  const token = await AsyncStorage.getItem(Constants.MOODLE_USER_TOKEN);
  const response = await fetch(
    `${
      Constants.MOODLE_HOST
    }/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${token}&wsfunction=${wsfunction}`,
  );

  const data = await response.json();

  if (data.errorcode) {
    throw data;
  }

  return data;
};

export const renewMoodleUserToken = async ({username, password}) => {
  const response = await fetch(
    `${
      Constants.MOODLE_HOST
    }/login/token.php?service=moodle_mobile_app&username=${username}&password=${password}`,
  );
  const data = await response.json();

  if (data.errorcode) {
    throw data;
  }

  await AsyncStorage.setItem(Constants.MOODLE_USER_TOKEN, data.token);

  return data.token;
};
