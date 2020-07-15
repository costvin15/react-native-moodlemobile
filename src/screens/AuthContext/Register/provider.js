import Constants from '../../../api/constants';

const registerUser = async values => {
  const url = `${Constants.MOODLE_HOST}/lib/ajax/service.php`;
  const body = [
    {
      index: '0',
      methodname: 'auth_email_signup_user',
      args: {
        ...values,
      },
    },
  ];

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const {data} = (await response.json())[0];

  if (!data.success) {
    throw data;
  }

  return data;
};

export default {registerUser};
