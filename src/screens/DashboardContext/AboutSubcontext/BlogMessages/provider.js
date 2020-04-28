import Helper from '../../../../api/helper';

const getEntries = async ({id}) => {
  const {entries} = await Helper.callMoodleWebService('core_blog_get_entries', {
    filters: [
      {
        name: 'userid',
        value: id,
      },
    ],
  });

  for (const entry of entries) {
    const user = await getUserDetail(entry.userid);
    entry.user = user;
  }

  return entries;
};

const getUserDetail = async userid => {
  const response = await Helper.callMoodleWebService(
    'core_user_get_users_by_field',
    {
      field: 'id',
      values: [userid],
    },
  );
  return response[0];
};

export default {getEntries};
