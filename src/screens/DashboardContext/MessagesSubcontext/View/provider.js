import Helper from '../../../../api/helper';

const getCurrentUser = async () => {
  const result = await Helper.getCurrentUserDetails();
  return result;
};

const getConversation = async id => {
  const {userid} = await Helper.getCurrentUserDetails();

  await Helper.callMoodleWebService(
    'core_message_mark_all_conversation_messages_as_read ',
    {
      userid,
      conversationid: id,
    },
  );

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

const getConversationsBetweenUsers = async ({otheruserid}) => {
  const {userid} = await Helper.getCurrentUserDetails();
  const response = await Helper.callMoodleWebService(
    'core_message_get_conversation_between_users',
    {
      userid,
      otheruserid,
      includecontactrequests: 0,
      includeprivacyinfo: 0,
    },
  );
  return response;
};

const getSelfConversation = async () => {
  const {userid} = await Helper.getCurrentUserDetails();
  const response = await Helper.callMoodleWebService(
    'core_message_get_self_conversation',
    {
      userid,
    },
  );
  return response;
};

const sendMessageToConversations = async ({conversationId, data}) => {
  if (conversationId === null) {
    return [];
  }

  const response = await Helper.callMoodleWebService(
    'core_message_send_messages_to_conversation',
    {
      conversationid: conversationId,
      messages: [
        {
          text: data[0].text,
          textformat: 2,
        },
      ],
    },
  );
  return response;
};

export default {
  getCurrentUser,
  getConversation,
  getConversationsBetweenUsers,
  getSelfConversation,
  sendMessageToConversations,
};
