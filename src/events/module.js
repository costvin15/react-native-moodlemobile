import Navigation from '../RootNavigation';

const events = [
  {
    name: 'core.module.view',
    handler: ({item, courseid}) => {
      console.log(
        `Event core.module.view received with name ${item.name} and modname ${
          item.modname
        }`,
      );
      switch (item.modname) {
        case 'page':
          Navigation.navigate('modulescontext', {
            screen: 'page',
            params: {item, courseid},
          });
          break;
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
