import {callMoodleWebService} from '../../api/helper';

export const getActionsEventsByTimesort = async () => {
  try {
    const response = await callMoodleWebService(
      'core_calendar_get_action_events_by_timesort',
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {getActionsEventsByTimesort};
