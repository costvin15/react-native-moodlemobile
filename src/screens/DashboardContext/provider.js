import Helper from '../../api/helper';

export const getUnreadConversationsCount = async () => {
  const {userid} = await Helper.getCurrentUserDetails();
  const response = await Helper.callMoodleWebService(
    'core_message_get_unread_conversations_count',
    {
      useridto: userid,
    },
  );
  return response;
};

export default {getUnreadConversationsCount};
