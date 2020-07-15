import {callMoodleWebService} from '../../api/helper';

export const Provider = {
  getPage: async ({id}, courseid) => {
    const {pages} = await callMoodleWebService(
      'mod_page_get_pages_by_courses',
      {
        courseids: [courseid],
      },
    );
    const page = pages.find(value => value.coursemodule === id);
    return page;
  },
};

export default Provider;
