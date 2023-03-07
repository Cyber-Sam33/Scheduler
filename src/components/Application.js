import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

//UseApplicationData.js can be found in the hooks folder, responsible for the server interation
// required when inputting data, such as the axios requests
export default function Application(props) {
  // these are deconstructed from UseApplicationData
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // two key changes needed when setting state for getting interviewers and Appointments for the day
  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Individual Appointments added by mapping over the array and create the new apointments using the data
  const appointments = dailyAppointments.map((appointment) => {
    const { id, interview } = appointment;
    const interviewObj = getInterview(state, interview);
    return (
      <Appointment
        key={id}
        {...appointment}
        interview={interviewObj}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointments}</section>
    </main>
  );
}
