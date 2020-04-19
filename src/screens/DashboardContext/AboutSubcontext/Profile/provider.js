import Helper from '../../../../api/helper';

export const getUserById = async ({id}) => {
  const response = await Helper.callMoodleWebService(
    'core_user_get_users_by_field',
    {
      field: 'id',
      values: [id],
    },
  );
  return response[0];
};

export default {getUserById};
