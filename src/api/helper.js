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
