export function getAppointmentsForDay(state, day) {
  const filterDay = state.days.filter((currentDay) => currentDay.name === day);
  console.log("state", state);
  console.log("Filter Day", filterDay);
  if (!filterDay[0]) {
    return [];
  }

  const filteredAppointments = filterDay[0].appointments.map((appointment) => {
    return state.appointments[appointment];

  });
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const id = interview.interviewer;
  return { ...interview, interviewer: state.interviewers[id] };
}




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

