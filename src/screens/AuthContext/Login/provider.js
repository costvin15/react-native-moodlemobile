import {Linking} from 'react-native';
import Provider from '../../../api/helper';
import Constants from '../../../api/constants';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const splitUrl = (url = '') => {
  const result = {
    protocol: '',
    domain: '',
    routes: [],
    params: {},
  };
  const tokens = url.split('/');
  let head = 0;
  if (tokens[1] === '') {
    head = 2;
    result.protocol = tokens[0].substr(0, tokens[0].length - 1);
  }
  result.domain = tokens[head];

  for (let i = head + 1; i < tokens.length - 1; i++) {
    result.routes.push(tokens[i]);
  }

  const page = tokens[tokens.length - 1].split('?');
  result.routes.push(page[0]);
  const query = page[1];
  const params = query.split('&');

  for (let param of params) {
    param = param.split('=');
    result.params[param[0]] = param[1];
  }

  return result;
};

export const openBrowserForOAuthLogin = async ({url, navigation}) => {
  let launchUrl = Constants.MOODLE_HOST + '/admin/tool/mobile/launch.php';
  const uri = splitUrl(url);
  const options = {
    service: Constants.MOODLE_SERVICE,
    oauthsso: uri.params.id,
    passport: Math.random() * 1000,
    urlscheme: Constants.MOODLE_CUSTOMURLSCHEME,
  };

  let index = 0;
  for (const [key, value] of Object.entries(options)) {
    if (index === 0) {
      launchUrl += '?';
    } else {
      launchUrl += '&';
    }
    launchUrl += `${key}=${value}`;
    index++;
  }

  if (await InAppBrowser.isAvailable()) {
    const result = await InAppBrowser.openAuth(launchUrl, null, {
      ephemeralWebSession: false,
    });
    if (result.type === 'success') {
      const matches = /token=(.*)/.exec(result.url);
      const token = await Provider.setMoodleUserToken(matches[1]);
      console.log('result');
      console.log(result.url);
      console.log('Token:');
      console.log(token);
      // navigation.navigate('dashboardcontext', {screen: 'frontpage'});
    }
  } else if (await Linking.canOpenURL(launchUrl)) {
    await Linking.openURL(launchUrl);
  } else {
    console.error('Cannot open identity provider');
  }
};

export const getIdentityProviders = async () => {
  const {identityproviders} = await Provider.callMoodleWebService(
    'tool_mobile_get_public_config',
    {
      wstoken: Constants.MOODLE_ADMIN_TOKEN,
    },
  );
  return identityproviders;
};

export const makeLogin = async ({navigation, username, password}) => {
  await Provider.renewMoodleUserToken({username: username, password});
  navigation.navigate('dashboardcontext', {screen: 'frontpage'});
};

export default {openBrowserForOAuthLogin, getIdentityProviders, makeLogin};
