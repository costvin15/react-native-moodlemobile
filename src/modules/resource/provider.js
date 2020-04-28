import Helper from '../../api/helper';

export const getResourceDataByKey = async () => {
  const token = await Helper.getMoodleUserToken();
  const response = await Helper.callMoodleWebService(
    'mod_resource_get_resources_by_courses',
  );
  console.log(response);
};

export default {getResourceDataByKey};
