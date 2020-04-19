import {callMoodleWebService, getCurrentUserDetails} from '../../../api/helper';

const conversationsTypes = {
  PRIVATE: 1,
  GROUP: 2,
  FAVOURITES: 3,
};

export const getConversations = async (
  userid,
  type = conversationsTypes.FAVOURITES,
) => {
  const {conversations} = await callMoodleWebService(
    'core_message_get_conversations',
    {userid, type},
  );
  return conversations;
};

export const getPrivateConversations = async () => {
  const {userid} = await getCurrentUserDetails();
  const conversations = await getConversations(
    userid,
    conversationsTypes.PRIVATE,
  );
  return conversations;
};

export const getGroupConversations = async () => {
  const {userid} = await getCurrentUserDetails();
  const conversations = await getConversations(
    userid,
    conversationsTypes.GROUP,
  );
  return conversations;
};

export const getFavouritesConversations = async () => {
  const {userid} = await getCurrentUserDetails();
  const conversations = await getConversations(
    userid,
    conversationsTypes.FAVOURITES,
  );
  return conversations;
};

export default {
  getConversations,
  getPrivateConversations,
  getGroupConversations,
  getFavouritesConversations,
};
