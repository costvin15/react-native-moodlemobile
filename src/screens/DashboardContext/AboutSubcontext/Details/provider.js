import Helper from '../../../../api/helper';

const getUserDetails = async id => {
  const response = await Helper.callMoodleWebService(
    'core_user_get_users_by_field',
    {
      field: 'id',
      values: [id],
    },
  );

  const user = response[0];
  return user;
};

export default {getUserDetails};
