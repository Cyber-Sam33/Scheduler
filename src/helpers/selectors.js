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