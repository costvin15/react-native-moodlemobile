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
  return entries;
};

export default {getEntries};
