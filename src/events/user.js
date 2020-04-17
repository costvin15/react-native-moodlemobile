import Navigation from '../RootNavigation';

const events = [
  {
    name: 'core.user.details',
    handler: ({id}) => {
      console.log(`Event core.user.details received with id ${id}`);
      Navigation.navigate('aboutsubcontext', {screen: 'details', params: {id}});
    },
  },
];

export default events;
