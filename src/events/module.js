import Navigation from '../RootNavigation';

const events = [
  {
    name: 'core.module.view',
    handler: ({item}) => {
      console.log(`Event core.module.view received with name ${item.name}`);
      try {
        Navigation.navigate('modulescontext', {
          screen: item.modname,
          params: {item},
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
];

export default events;
