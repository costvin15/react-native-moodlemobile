import Navigation from '../RootNavigation';

const events = [
  {
    name: 'core.module.view',
    handler: ({item}) => {
      console.log(`Event core.module.view received with name ${item.name}`);
      switch (item.modname) {
        case 'resource':
          Navigation.navigate('modulescontext', {
            screen: 'resource',
            params: {item},
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
