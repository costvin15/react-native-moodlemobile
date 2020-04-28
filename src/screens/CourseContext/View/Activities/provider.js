import {callMoodleWebService} from '../../../../api/helper';

export const getSectionAndActivities = async courseid => {
  const response = await callMoodleWebService('core_course_get_contents', {
    courseid,
  });

  for (const section of response) {
    for (const module of section.modules) {
      const modicon = await fetch(module.modicon);
      const {type} = await modicon.blob();
      module.modicontype = type;
    }
  }

  return response;
};

export default {getSectionAndActivities};
