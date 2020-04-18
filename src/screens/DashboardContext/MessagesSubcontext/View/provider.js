import Helper from '../../../../api/helper';

const getCurrentUser = async () => {
  const result = await Helper.getCurrentUserDetails();
  return result;
};

const getConversationMessages = async id => {
  const {userid} = await Helper.getCurrentUserDetails();
  const response = await Helper.callMoodleWebService(
    'core_message_get_conversation',
    {
      userid,
      conversationid: id,
      includecontactrequests: 0,
      includeprivacyinfo: 0,
    },
  );
  return response;
};

export default {getCurrentUser, getConversationMessages};
