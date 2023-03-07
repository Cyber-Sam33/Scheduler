// all helper functions contained in this file

//returns an array with length matching number of appointment for the day
//and returns appoinment objects
export function getAppointmentsForDay(state, day) {
  const filterDay = state.days.filter((currentDay) => currentDay.name === day);
  console.log("state", state);
  console.log("Filter Day", filterDay);
  //if data, an empty array is returned
  if (!filterDay[0]) {
    return [];
  }


  const filteredAppointments = filterDay[0].appointments.map((appointment) => {
    return state.appointments[appointment];
  });
  return filteredAppointments;
}


// returns the interview data in object 
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

//returns an array with the correct interview objects
export function getInterviewersForDay(state, day) {
  const filterDay = state.days.filter((currentDay) => currentDay.name === day);
  console.log("state", state);
  console.log("Filter Day", filterDay);

  if (!filterDay[0]) {
    return [];
  }

  const filteredInterviewers = filterDay[0].interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  });
  return filteredInterviewers;
}
