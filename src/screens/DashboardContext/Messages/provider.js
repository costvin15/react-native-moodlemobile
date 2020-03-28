import {callMoodleWebService, getCurrentUserDetails} from '../../../api/helper';

export const getConversations = async () => {
  try {
    const {userid} = await getCurrentUserDetails();
    const {conversations} = await callMoodleWebService(
      'core_message_get_conversations',
      {userid},
    );
    return conversations;
  } catch (error) {
    console.error(error);
  }
};

export default {getConversations};
