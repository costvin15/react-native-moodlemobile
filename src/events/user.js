import Navigation from '../RootNavigation';
import {callMoodleWebService} from '../api/helper';

const events = [
  {
    name: 'core.user.view',
    handler: async ({id}) => {
      await callMoodleWebService('core_user_view_user_profile', {
        userid: id,
      });
      console.log(`Event core.user.view received with id ${id}`);
      Navigation.navigate('aboutsubcontext', {screen: 'profile', params: {id}});
    },
  },
  {
    name: 'core.user.details',
    handler: ({id}) => {
      console.log(`Event core.user.details received with id ${id}`);
      Navigation.navigate('aboutsubcontext', {screen: 'details', params: {id}});
    },
  },
  {
    name: 'core.user.blogmessages',
    handler: ({id}) => {
      console.log(`Event core.user.blogmessages received with id ${id}`);
      Navigation.navigate('aboutsubcontext', {
        screen: 'blogmessages',
        params: {id},
      });
    },
  },
  {
    name: 'core.user.message.send',
    handler: ({id, touserid}) => {
      console.log('Event core.user.message.send received');
      Navigation.navigate('messagessubcontext', {
        screen: 'view',
        params: {id, touserid},
      });
    },
  },
];

export default events;
