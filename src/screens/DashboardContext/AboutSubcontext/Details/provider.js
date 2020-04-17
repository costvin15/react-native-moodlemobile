import Helper from '../../../../api/helper';

const getUserDetails = async () => {
  const {userid} = await Helper.getCurrentUserDetails();
  const response = await Helper.callMoodleWebService(
    'core_user_get_users_by_field',
    {
      field: 'id',
      values: [userid],
    },
  );

  const user = response[0];
  return user;
};

export default {getUserDetails};
