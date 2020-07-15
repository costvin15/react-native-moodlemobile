import Helper from '../../api/helper';

export const Provider = {
  getFeedbackById: async module => {
    const {feedbacks} = await Helper.callMoodleWebService(
      'mod_feedback_get_feedbacks_by_courses',
      {
        courseids: [module.courseid],
      },
    );
    const feedback = feedbacks.find(
      _feedback => _feedback.coursemodule === module.id,
    );
    return feedback;
  },
};

export default Provider;
