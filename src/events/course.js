import Navigation from '../RootNavigation';

const events = [
  {
    name: 'core.course.view',
    handler: ({id}) => {
      console.log(`Event core.course.view received with id ${id}!`);
      Navigation.navigate('coursecontext', {screen: 'view', params: {id}});
    },
  },
  {
    name: 'core.course.activity.view',
    handler: ({item}) => {
      console.log(
        `Event core.course.activity.view received with name ${item.name}`,
      );
      Navigation.navigate('coursecontext', {
        screen: 'activity',
        params: {item},
      });
    },
  },
];

export default events;
