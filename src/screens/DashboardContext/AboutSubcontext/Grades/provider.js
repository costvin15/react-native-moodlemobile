import Helper from '../../../../api/helper';

const getGrades = async () => {
  const {userid} = await Helper.getCurrentUserDetails();
  const courses = await Helper.getUserCourses();

  const grades = [];
  for (const course of courses) {
    const grade = {
      courseid: course.id,
      course: course.fullname,
      totalgrade: 0,
    };

    const {usergrades} = await Helper.callMoodleWebService(
      'gradereport_user_get_grade_items',
      {
        userid,
        courseid: course.id,
      },
    );

    const response = usergrades[0];
    for (const item of response.gradeitems) {
      if (item.weightraw) {
        grade.totalgrade += item.graderaw * item.weightraw;
      } else if (item.gradedatesubmitted) {
        grade.totalgrade += item.graderaw;
      }
    }

    grades.push(grade);
  }

  return grades;
};

export default {getGrades};
