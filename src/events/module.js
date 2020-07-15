import Navigation from '../RootNavigation';
import {callMoodleWebService} from '../api/helper';

const events = [
  {
    name: 'core.module.view',
    handler: async ({item, courseid}) => {
      console.log(
        `Event core.module.view received with name ${item.name} and modname ${
          item.modname
        }`,
      );
      switch (item.modname) {
        case 'page':
          await callMoodleWebService('mod_page_view_page', {
            pageid: item.instance,
          });
          Navigation.navigate('modulescontext', {
            screen: 'page',
            params: {item, courseid},
          });
          break;
        case 'resource':
          await callMoodleWebService('mod_resource_view_resource ', {
            resourceid: item.instance,
          });
          Navigation.navigate('modulescontext', {
            screen: 'resource',
            params: {item},
          });
          break;
        case 'feedback':
          await callMoodleWebService('mod_feedback_view_feedback', {
            feedbackid: item.instance,
          });
          Navigation.navigate('modulescontext', {
            screen: 'feedback',
            params: {item, courseid},
          });
          break;
        default:
          Navigation.navigate('modulescontext', {
            screen: 'notfound',
            params: {item},
          });
      }
    },
  },
];

export default events;
