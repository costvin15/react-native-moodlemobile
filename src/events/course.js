import Navigation from '../RootNavigation';
import {callMoodleWebService} from '../api/helper';

const events = [
  {
    name: 'core.course.view',
    handler: async ({id}) => {
      await callMoodleWebService('core_course_view_course', {
        courseid: id,
      });
      console.log(`Event core.course.view received with id ${id}!`);
      Navigation.navigate('coursecontext', {screen: 'view', params: {id}});
    },
  },
];

export default events;
