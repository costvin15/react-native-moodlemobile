import {Linking} from 'react-native';
import Provider from '../../../api/helper';
import Constants from '../../../api/constants';

export const openBrowserForOAuthLogin = async (provider) => {
  const launchUrl = Constants.MOODLE_HOST + '/admin/tool/mobile/launch.php';
  const service = Constants.MOODLE_SERVICE;
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

export default {openBrowserForOAuthLogin, getIdentityProviders};
